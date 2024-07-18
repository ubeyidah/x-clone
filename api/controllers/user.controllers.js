import Users from "../models/user.models.js";

const getUserProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userProfile = await Users.findOne({ userName: username }).select(
      "-password"
    );
    if (!userProfile)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};
const getSuggestedUsers = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const followUnfollowUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const updateUserProfile = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export {
  getUserProfile,
  getSuggestedUsers,
  followUnfollowUser,
  updateUserProfile,
};
