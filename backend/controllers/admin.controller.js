import User from "../models/user.model.js";

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
