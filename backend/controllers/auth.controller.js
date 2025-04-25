import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import transporter from "../lib/utils/nodemailer.js";
import { generateOTP } from "../lib/utils/generateOTP.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  try {
    const { fullname, username, email, password, phone, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const philippinePhoneRegex = /^(09|\+639)\d{9}$/;
    if (!philippinePhoneRegex.test(phone)) {
      return res.status(400).json({
        error: "Invalid phone number format",
        message:
          "Please enter a valid Philippine mobile number (e.g., 09XXXXXXXXX or +639XXXXXXXXX)",
      });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ error: "Phone number is already registered" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    const otpExpiry = Date.now() + 15 * 60 * 1000;

    const newUser = new User({
      fullname,
      username,
      email,
      phone,
      password: hashedPassword,
      role,
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpiry,
    });

    await newUser.save();

    const signupMail = {
      from: `Canuels Corp <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Account Verification OTP",
      html: `
        <h1>Welcome to Our Platform!</h1>
        <p>Thank you for signing up. To verify your account, please use the following OTP:</p>
        <p><strong>${otp}</strong></p>
        <p>This OTP will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(signupMail);

    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      profileImg: newUser.profileImg,
      role: newUser.role,
      isAccountVerified: newUser.isAccountVerified,
      message: "Verification OTP has been sent to your email",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      profileImg: user.profileImg,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ error: "Account already verified" });
    }

    const otp = generateOTP();

    const expiryTime = Date.now() + 15 * 60 * 1000;

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = expiryTime;
    await user.save();

    const verificationOtp = {
      from: `Canuels Corp <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Account Verification OTP",
      html: `
        <h1>Welcome to Our Platform!</h1>
        <p>Thank you for signing up. To verify your account, please use the following OTP:</p>
        <p><strong>${otp}</strong></p>
        <p>This OTP will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(verificationOtp);

    res.status(200).json({ message: "Verification OTP sent to your email" });
  } catch (error) {
    console.log("Error in sendVerificationOtp controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ error: "Account already verified" });
    }

    if (user.verifyOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.status(200).json({ message: "Account verified successfully" });
  } catch (error) {
    console.log("Error in verifyAccount controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
