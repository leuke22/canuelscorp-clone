import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  requestPasswordResetOtp,
  resetPassword,
  updateUser,
  userInquire,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/update", protectRoute, updateUser);

router.post("/inquire", userInquire);

router.post("/resetPasswordOtp", requestPasswordResetOtp);
router.post("/resetPassword", resetPassword);

export default router;
