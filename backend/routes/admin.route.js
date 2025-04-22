import express from "express";
import {
  adminOnly,
  adminOrSupervisor,
  protectRoute,
} from "../middleware/protectRoute.js";

import {
  deleteUser,
  getAdminProfile,
  getUsers,
  updateAdminProfile,
  updateUsers,
} from "../controllers/admin.controller.js";
import {
  deleteOrder,
  getUserOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/user", protectRoute, adminOrSupervisor, getUsers);
router.post("/updateUser/:userId", protectRoute, adminOnly, updateUsers);

router.get("/:username", protectRoute, adminOrSupervisor, getAdminProfile);
router.post(
  "/profile/:username",
  protectRoute,
  adminOrSupervisor,
  updateAdminProfile
);
router.delete("/delete/:userId", protectRoute, adminOnly, deleteUser);

router.get("/user/orders", protectRoute, adminOrSupervisor, getUserOrder);
router.post(
  "/user/orders/:orderId/status",
  protectRoute,
  adminOrSupervisor,
  updateOrderStatus
);
router.delete(
  "/user/orders/:orderId",
  protectRoute,
  adminOrSupervisor,
  deleteOrder
);

export default router;
