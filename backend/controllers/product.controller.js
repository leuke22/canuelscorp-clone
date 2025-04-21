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

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProducts controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    let { image } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let imageUrl = product.image;
    if (image && image !== product.image) {
      try {
        const uploadedResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadedResponse.secure_url;
      } catch (cloudinaryError) {
        console.log("Cloudinary upload error:", cloudinaryError);
        return res.status(400).json({
          error:
            "Image upload failed. Make sure the image URL or data is valid.",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: name || product.name,
        description: description || product.description,
        image: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error in updateProduct controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
