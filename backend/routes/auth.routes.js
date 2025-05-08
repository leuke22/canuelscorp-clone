import express from "express";
import {
  getMe,
  login,
  logout,
  refreshToken,
  sendVerificationOtp,
  signup,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/sendVerification", sendVerificationOtp);
router.post("/verifyOtp", verifyOtp);

router.post("/refresh-token", refreshToken);

export default router;
