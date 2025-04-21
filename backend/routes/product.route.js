import express from "express";

import {
  adminOnly,
  adminOrSupervisor,
  protectRoute,
} from "../middleware/protectRoute.js";

import { createProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", protectRoute, adminOrSupervisor, createProduct);

export default router;
