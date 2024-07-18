import Notifications from "../models/notification.models.js";
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
    const userToModifiy = await Users.findById(req.params.id).select(
      "-password"
    );
    const currentUser = req.user;
    if (!userToModifiy || !currentUser)
      return res.status(404).json({ message: "User not found" });
    if (userToModifiy._id.toString() === currentUser._id.toString())
      return res.status(401).json({ message: "You can't follow yourself" });
    const isFollow = userToModifiy.followers.includes(currentUser._id);
    if (isFollow) {
      Promise.all([
        await Users.findByIdAndUpdate(userToModifiy._id, {
          $pull: { followers: currentUser._id },
        }),
        await Users.findByIdAndUpdate(currentUser._id, {
          $pull: { following: userToModifiy._id },
        }),
      ]);
      res.status(200).json({ message: "Unfollowed user successfully" });
    } else {
      Promise.all([
        await Users.findByIdAndUpdate(userToModifiy._id, {
          $push: { followers: currentUser._id },
        }),
        await Users.findByIdAndUpdate(currentUser._id, {
          $push: { following: userToModifiy._id },
        }),
        await Notifications({
          type: "follow",
          from: currentUser._id,
          to: userToModifiy._id,
        }).save(),
      ]);
      //send  notification to user
      res.status(200).json({ message: "Followed user successfully" });
    }
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
