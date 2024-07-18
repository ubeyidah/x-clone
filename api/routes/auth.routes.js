import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
} from "../controllers/auth.controllers.js";
const router = new express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe);
export default router;
