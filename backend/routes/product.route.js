import express from "express";

import { adminOrSupervisor, protectRoute } from "../middleware/protectRoute.js";

import {
  createProduct,
  deleteMultipleProducts,
  deleteProduct,
  getBestSellingProducts,
  getCategory,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/create", protectRoute, adminOrSupervisor, createProduct);
router.post("/update/:id", protectRoute, adminOrSupervisor, updateProduct);
router.delete("/delete/:id", protectRoute, adminOrSupervisor, deleteProduct);
router.delete(
  "/",
  protectRoute,
  adminOrSupervisor,
  deleteMultipleProducts
);
router.get("/category/:category", getCategory);
router.get("/best-selling", getBestSellingProducts);

export default router;
