import Product from "../models/product.model.js";
import Order from "../models/orders.model.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

export const createProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    let { image } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Product name and description are required" });
    }

    if (category) {
      if (
        category !== "Pork" &&
        category !== "Chicken" &&
        category !== "Beef"
      ) {
        return res.status(400).json({ error: "Invalid category" });
      }
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url ? uploadedResponse.secure_url : "";
    }

    const product = await Product.create({
      image,
      name,
      category,
      description,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      products,
      count: products.length,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.log("Error in getProducts controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, category } = req.body;
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

        if (product.image && product.image.includes("cloudinary")) {
          const publicId = product.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.log("Cloudinary error:", cloudinaryError);
        return res.status(400).json({
          error:
            "Image processing failed. Make sure the image URL or data is valid.",
        });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        image: imageUrl,
        name: name || product.name,
        category: category || product.category,
        description: description || product.description,
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

    if (product.image && product.image.includes("cloudinary")) {
      try {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted image with public ID: ${publicId}`);
      } catch (cloudinaryError) {
        console.log("Error deleting image from Cloudinary:", cloudinaryError);
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteMultipleProducts = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Invalid product IDs" });
    }

    const products = await Product.find({ _id: { $in: ids } });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found with the provided IDs" });
    }

    await Promise.all(
      products.map(async (prod) => {
        if (prod.image && prod.image.includes("cloudinary")) {
          const publicId = prod.image.split("/").pop().split(".")[0];
          try {
            await cloudinary.uploader.destroy(publicId);
            console.log(`Deleted image with public ID: ${publicId}`);
          } catch (err) {
            console.warn(`Could not delete image ${publicId}:`, err);
          }
        }
      })
    );

    const result = await Product.deleteMany({ _id: { $in: ids } });

    const count = result.deletedCount;
    const message =
      count === 1
        ? "Successfully deleted 1 product"
        : `Successfully deleted ${count} products`;

    return res.status(200).json({ message, deletedCount: count });
  } catch (error) {
    console.error("Error deleting products:", error);
    return res
      .status(500)
      .json({ error: "Server error while deleting products" });
  }
};

export const getCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({
      products,
      count: products.length,
      message: "Category products fetched successfully",
    });
  } catch (error) {
    console.log("Error in getCategory controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    const bestSelling = await Order.aggregate([
      // First unwind the items array to get individual product entries
      { $unwind: "$items" },

      // Group by product to sum quantities and count orders
      {
        $group: {
          _id: "$items.product",
          totalQuantity: { $sum: "$items.quantity" },
          // Count unique orders containing this product
          totalOrders: { $addToSet: "$_id" },
        },
      },

      // Add product details
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },

      // Unwind the product details
      { $unwind: "$productDetails" },

      {
        $project: {
          _id: "$productDetails._id",
          name: "$productDetails.name",
          description: "$productDetails.description",
          image: "$productDetails.image",
          category: "$productDetails.category",
          totalQuantity: 1,
          totalOrders: { $size: "$totalOrders" },
        },
      },

      {
        $sort: {
          totalQuantity: -1,
          totalOrders: -1,
        },
      },

      { $limit: 5 },
    ]);

    res.status(200).json({
      products: bestSelling,
      message: "Best selling products fetched successfully",
    });
  } catch (error) {
    console.error("Error in getBestSellingProducts controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
