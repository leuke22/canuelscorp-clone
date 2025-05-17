import express from "express";
import {
  userInquire,
  getUserInquires,
  deleteUserInquire,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", userInquire);
router.get("/get", getUserInquires);
router.delete("/delete", deleteUserInquire);

export default router;
