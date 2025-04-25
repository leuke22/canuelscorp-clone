import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import UserInquire from "../models/userInquire.model.js";
import transporter from "../lib/utils/nodemailer.js";
import { generateOTP } from "../lib/utils/generateOTP.js";

export const updateUser = async (req, res) => {
  const { username, fullname, email, currentPassword, newPassword, phone } =
    req.body;
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

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profileImg = profileImg || user.profileImg;
    user.phone = phone || user.phone;

    user = await user.save();

    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
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

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL || "noreply@yourdomain.com",
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h1>Password Reset</h1>
        <p>Your password reset OTP is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 15 minutes.</p>
        <p>If you did not request this password reset, please ignore this email.</p>
      `,
    });

    res.status(200).json({ message: "Password reset OTP sent to your email" });
  } catch (error) {
    console.log("Error in requestPasswordResetOtp controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        error: "Email, OTP, and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    if (Date.now() > user.resetOtpExpireAt) {
      return res.status(400).json({ error: "OTP has expired" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log("Error in resetPassword controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
