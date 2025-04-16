import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
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
    role: {
      type: String,
      enum: ["admin", "user", "supervisor"],
      default: "user",
    },
    profileImg: {
      type: String,
      default: "",
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      provice: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
