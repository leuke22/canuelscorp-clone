import express from "express";
import {
  getMe,
  login,
  logout,
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

export default router;
