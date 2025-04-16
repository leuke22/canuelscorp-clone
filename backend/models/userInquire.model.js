import mongoose from "mongoose";

const userInquireSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserInquire = mongoose.model("UserInquire", userInquireSchema);
export default UserInquire;
