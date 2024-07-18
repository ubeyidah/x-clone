import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getUserProfile,
  getSuggestedUsers,
  followUnfollowUser,
  updateUserProfile,
} from "../controllers/user.controllers.js";
const router = new express.Router();

router.get("/profile/:username", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.put("/follow/:id", protectRoute, followUnfollowUser);
router.put("/update", protectRoute, updateUserProfile);
export default router;
