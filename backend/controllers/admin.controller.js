import User from "../models/auth.model.js";

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
    const { role } = req.query;

    let query = { role: { $ne: "admin" } };

    if (role && role !== "All") {
      query.role = role;
    }

    if (requestingUser.role === "supervisor") {
      query.role = "user";
    }

    users = await User.find(query).select("-password -verifyOtp -resetOtp");

    res.status(200).json({
      users,
      count: users.length,
    });
  } catch (error) {
    console.log("Error in getUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUsers = async (req, res) => {
  const { userIds } = req.body; // Expect array of user IDs
  const requestingUser = req.user;

  try {
    if (requestingUser.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete users" });
    }

    // Check if trying to delete own account
    if (userIds.includes(requestingUser._id.toString())) {
      return res.status(400).json({
        message: "You cannot delete your own admin account",
      });
    }

    // Delete multiple users
    const result = await User.deleteMany({
      _id: { $in: userIds },
      role: { $ne: "admin" }, // Extra safety check
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No users were deleted" });
    }

    return res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} users`,
    });
  } catch (error) {
    console.log("Error in deleteUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;
  const requestingUser = req.user;

  try {
    if (requestingUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update user roles" });
    }

    if (userId === requestingUser._id.toString()) {
      return res.status(400).json({
        message: "You cannot update your own admin role",
      });
    }

    // Validate role
    const validRoles = ["user", "supervisor"];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Don't allow updating admin roles
    if (user.role === "admin") {
      return res.status(403).json({ message: "Cannot update admin roles" });
    }

    user.role = newRole;
    await user.save();

    return res.status(200).json({
      message: "User role updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in updateUserRole: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
