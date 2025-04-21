import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCart);

router.post("/add", protectRoute, addToCart);
router.post("/update", protectRoute, updateCartItem);
router.delete("/delete/:productId", protectRoute, removeFromCart);
router.delete("/clear", protectRoute, clearCart);

export default router;
