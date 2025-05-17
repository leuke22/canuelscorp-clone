import express from "express";
import { adminOnly, protectRoute } from "../middleware/protectRoute.js";
import {
  getUsers,
  deleteUsers,
  updateUserRole,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", protectRoute, adminOnly, getUsers);
router.delete("/users", protectRoute, adminOnly, deleteUsers);
router.patch("/users/role", protectRoute, adminOnly, updateUserRole);

export default router;
