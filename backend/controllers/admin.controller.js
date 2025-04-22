import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getAdminProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const requestingUser = req.user;

    if (
      requestingUser.role !== "admin" &&
      requestingUser.role !== "supervisor"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const adminProfile = await User.findOne({
      username,
      role: { $in: ["admin", "supervisor"] },
    }).select("-password");

    if (!adminProfile) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    res.status(200).json(adminProfile);
  } catch (error) {
    console.log("Error in getAdminProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req, res) => {
  const requestingUser = req.user;

  try {
    if (
      requestingUser.role !== "admin" &&
      requestingUser.role !== "supervisor"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    let users;

    if (requestingUser.role === "admin") {
      users = await User.find({ role: { $ne: "admin" } }).select("-password");
    } else {
      users = await User.find({ role: "user" }).select("-password");
    }

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in getUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const requestingUser = req.user;

  try {
    if (requestingUser.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete users" });
    }

    if (userId === requestingUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own admin account" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUser = req.user;

    if (requestingUser.role !== "admin") {
      return res.status(403).json({ message: "Only admins can update users" });
    }

    if (userId === requestingUser._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot update your own admin account" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndUpdate(userId, req.body, { new: true });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log("Error in updateUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  const { username } = req.params;
  const requestingUser = req.user;
  const { fullname, email, phone, profileImg, currentPassword, newPassword } =
    req.body;

  try {
    if (
      requestingUser.role !== "admin" &&
      requestingUser.role !== "supervisor"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const adminProfile = await User.findOne({
      username,
      role: { $in: ["admin", "supervisor"] },
    });

    if (!adminProfile) {
      return res.status(404).json({ message: "Admin profile not found" });
    }

    if (adminProfile._id.toString() !== requestingUser._id.toString()) {
      if (requestingUser.role !== "admin") {
        return res.status(403).json({
          message: "Supervisors can only update their own profile",
        });
      }
    }

    const updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (profileImg) updateData.profileImg = profileImg;

    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          error: "Please provide both current password and new password",
        });
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        adminProfile.password
      );
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters long",
        });
      }

      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(newPassword, salt);
    }

    const updatedProfile = await User.findByIdAndUpdate(
      adminProfile._id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log("Error in updateAdminProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
