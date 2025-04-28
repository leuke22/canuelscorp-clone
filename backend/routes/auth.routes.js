import express from "express";
import {
  getMe,
  login,
  logout,
  refreshToken,
  sendVerificationOtp,
  signup,
  verifyAccount,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/sendVerification", sendVerificationOtp);
router.post("/verifyAccount", verifyAccount);

router.post("/refresh-token", refreshToken);

export default router;
