import User from "../models/user.model.js";
import transporter from "../lib/utils/nodemailer.js";
import { generateOTP } from "../lib/utils/generateOTP.js";
import { redis } from "../lib/utils/redis.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {
  generateTokens,
  storeRefreshToken,
  setCookies,
} from "../lib/utils/generateToken.js";

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

    const newUser = await User.create({
      fullname,
      username,
      email,
      phone,
      password,
      role,
    });

    const { accessToken, refreshToken } = generateTokens(newUser._id);
    await storeRefreshToken(newUser._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isAccountVerified: newUser.isAccountVerified,
      profileImg: newUser.profileImg,
      address: newUser.address,
      message: "Signup Successful!",
    });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, accessToken, refreshToken);

      res.status(200).json({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isAccountVerified: user.isAccountVerified,
        profileImg: user.profileImg,
        address: user.address,
        message: "Login Successful!",
      });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
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

export const verifyOtp = async (req, res) => {
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

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isAccountVerified: user.isAccountVerified,
      profileImg: user.profileImg,
      address: user.address,
      message: "Account verified successfully",
    });
  } catch (error) {
    console.log("Error in verifyAccount controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const {
    username,
    fullname,
    email,
    phone,
    currentPassword,
    newPassword,
    address,
  } = req.body;
  let { profileImg } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (username && username !== user.username) {
      const exists = await User.findOne({ username });
      if (exists) {
        return res.status(409).json({ error: "Username already in use" });
      }
      user.username = username;
    }
    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ error: "Email already in use" });
      }
      user.email = email;
    }

    user.fullname = fullname || user.fullname;
    user.phone = phone || user.phone;
    user.profileImg = profileImg || user.profileImg;

    user.address = {
      street: address.street ?? user.address.street,
      city: address.city ?? user.address.city,
      province: address.province ?? user.address.province,
      postalCode: address.postalCode ?? user.address.postalCode,
    };

    user = await user.save();
    const payload = user.toObject();
    delete payload.password;
    delete payload.__v;

    return res.status(200).json(payload);
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const requestPasswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = generateOTP();
    const expiryTime = Date.now() + 15 * 60 * 1000;

    user.resetOtp = otp;
    user.resetOtpExpireAt = expiryTime;
    await user.save();

    const passwordResetOtp = {
      from: `Canuels Corp <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h1>Thank you for using our Platform</h1>
        <p>Thank you for login. To verify your account, please use the following OTP:</p>
        <p><strong>${otp}</strong></p>
        <p>This OTP will expire in 15 minutes.</p>
      `,
    };

    await transporter.sendMail(passwordResetOtp);

    res.status(200).json({
      email: user.email,
      resetOtp: user.resetOtp,
      resetOtpExpireAt: user.resetOtpExpireAt,
      message: "Password reset OTP sent to your email",
    });
  } catch (error) {
    console.log("Error in requestPasswordResetOtp controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, resetOtp, newPassword, confirmNewPassword } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is not provided",
      });
    }

    if (!resetOtp) {
      return res.status(400).json({
        error: "OTP is required",
      });
    }

    if (!newPassword || !confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "Both new and confirm passwords are required" });
    }

    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({
      email,
      resetOtp,
      resetOtpExpireAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.password = newPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("Error in resetPassword controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.log("Error in refreshToken controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

//This function is only inquire the customer and not having an authentication
export const userInquire = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const existingName = await UserInquire.findOne({ name });
    if (existingName) {
      return res.status(400).json({ error: "Name is already taken" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
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

    const userInquire = new UserInquire({
      name,
      email,
      phone,
      message,
    });

    await userInquire.save();

    res.status(200).json(userInquire);
  } catch (error) {
    console.log("Error in userInquire: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
