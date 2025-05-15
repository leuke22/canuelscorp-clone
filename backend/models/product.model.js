import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Pork", "Chicken", "Beef"],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
