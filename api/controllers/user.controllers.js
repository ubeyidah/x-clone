import Notifications from "../models/notification.models.js";
import { v2 as cloudinary } from "cloudinary";
import Users from "../models/user.models.js";
import { userValidation } from "../schema/user.schema.js";
import { comparePassword, hashPassword } from "../utils/utils.js";

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
    const currentUserId = req.user._id;
    const userIfollowed = await Users.findById(currentUserId).select(
      "following"
    );
    const userWithOutMe = await Users.aggregate([
      {
        $match: { _id: { $ne: currentUserId } },
      },
      {
        $sample: { size: 10 },
      },
    ]);
    const filteredUsers = userWithOutMe.filter(
      (user) => !userIfollowed.following.includes(user._id)
    );
    let suggested = filteredUsers.slice(0, 4);
    suggested = suggested.map((user) => ({ ...user, password: null }));
    res.status(200).json(suggested);
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
const updateUser = async (req, res, next) => {
  const { fullName, email, userName, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg } = req.body;
  const userId = req.user._id;
  try {
    const { error } = userValidation.validate({
      fullName,
      email,
      userName,
      currentPassword,
      newPassword,
      bio,
      link,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if ((!newPassword && currentPassword) || (newPassword && !currentPassword))
      return res.status(400).json({
        message: "Please provide both current password and new password",
      });
    if (newPassword && currentPassword) {
      const isMatch = await comparePassword(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password" });
      const hashedPass = await hashPassword(newPassword);
      user.password = hashedPass;
    }
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadRes = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadRes.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const uploadRes = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadRes.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.userName = userName || user.userName;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;
    const savedUser = await user.save();
    const { password, ...updatedUser } = savedUser;
    return res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export { getUserProfile, getSuggestedUsers, followUnfollowUser, updateUser };
