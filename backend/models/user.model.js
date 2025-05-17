import mongoose from "mongoose";

const userInquireSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exist"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
      unique: [true, "Phone number already exist"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserInquire = mongoose.model("UserInquire", userInquireSchema);
export default UserInquire;
