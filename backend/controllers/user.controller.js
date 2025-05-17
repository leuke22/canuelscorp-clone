import UserInquire from "../models/user.model.js";

export const userInquire = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const existingEmail = await UserInquire.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const userInquire = await UserInquire.create({
      name,
      email,
      phone,
      message,
    });
    res.status(200).json({
      userInquire: userInquire,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.log("Error in userInquire controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserInquires = async (req, res) => {
  try {
    const userInquires = await UserInquire.find().sort({ createdAt: -1 });
    res.status(200).json({
      inquiries: userInquires,
      message: "Inquiries fetched successfully",
    });
  } catch (error) {
    console.log("Error in getUserInquires controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUserInquire = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        error: "Please provide valid inquiry IDs",
      });
    }

    await UserInquire.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: "Inquiries deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteUserInquire controller:", error);
    res.status(500).json({
      error: "Failed to delete inquiries",
    });
  }
};
