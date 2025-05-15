import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    shippingAddress: {
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      province: {
        type: String,
        default: "",
      },
      postalCode: {
        type: String,
        default: "",
      },
    },
    useDefaultAddress: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", async function (next) {
  if (this.useDefaultAddress && !this.shippingAddress.street) {
    try {
      const user = await mongoose.model("User").findById(this.user);
      if (user && user.address) {
        this.shippingAddress = user.address;
      }
    } catch (error) {
      next(error);
    }
  }
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
