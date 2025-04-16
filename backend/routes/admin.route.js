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
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", protectRoute, adminOrSupervisor, getUsers);

router.get("/:username", protectRoute, adminOrSupervisor, getAdminProfile);
router.delete("/delete/:userId", protectRoute, adminOnly, deleteUser);

export default router;
