import Product from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    let { image } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Product name and description are required" });
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    const product = new Product({
      name,
      description,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
