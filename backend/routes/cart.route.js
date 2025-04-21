import express from "express";

import { protectRoute, userOnly } from "../middleware/protectRoute.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, userOnly, getCart);

router.post("/add", protectRoute, userOnly, addToCart);
router.post("/update", protectRoute, userOnly, updateCartItem);
router.delete("/delete/:productId", protectRoute, userOnly, removeFromCart);
router.delete("/clear", protectRoute, clearCart);

export default router;
