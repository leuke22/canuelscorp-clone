import express from "express";

import {
  adminOnly,
  adminOrSupervisor,
  protectRoute,
} from "../middleware/protectRoute.js";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/create", protectRoute, adminOrSupervisor, createProduct);
router.post("/:id", protectRoute, adminOrSupervisor, updateProduct);
router.delete("/:id", protectRoute, adminOrSupervisor, deleteProduct);

export default router;
