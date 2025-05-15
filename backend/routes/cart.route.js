import express from "express";

import { protectRoute, userOnly } from "../middleware/protectRoute.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartAddress,
  updateCartItem,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectRoute, userOnly, getCart);

router.post("/add", protectRoute, userOnly, addToCart);
router.post("/update", protectRoute, userOnly, updateCartItem);
router.delete("/delete/:productId", protectRoute, userOnly, removeFromCart);
router.delete("/clear", protectRoute, clearCart);

router.post("/update-address", protectRoute, userOnly, updateCartAddress);

export default router;
