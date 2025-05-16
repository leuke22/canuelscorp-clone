import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleteOrder,
  getUserOrder,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", protectRoute, placeOrder);
router.get("/", protectRoute, getUserOrder);
router.patch("/:orderId/status", protectRoute, updateOrderStatus);
router.delete("/:orderId", protectRoute, deleteOrder);

export default router;
