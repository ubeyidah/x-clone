import Users from "../models/user.models.js";
import { loginSchema, signupSchema } from "../schema/auth.schema.js";
import {
  comparePassword,
  genTokenAndSetCookie,
  hashPassword,
} from "../utils/utils.js";

const signup = async (req, res, next) => {
  try {
    const { fullName, userName, email, password } = req.body;
    const { error } = signupSchema.validate({
      fullName,
      userName,
      email,
      password,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    // check for exsitace of user in database
    const existingUser = await Users.findOne({ userName });
    if (existingUser)
      return res.status(400).json({ message: "User name is already taken." });
    const existingEmail = await Users.findOne({ email });
    if (existingEmail)
      return res
        .status(400)
        .json({ message: "Email adress is already taken." });
    //hash user password
    const encryptedPassword = await hashPassword(password);
    const newUser = new Users({
      fullName,
      userName,
      email,
      password: encryptedPassword,
    });
    if (!newUser)
      return res.status(400).json({ message: "Invalid user data." });
    await newUser.save();
    // remove password from the user object before sending it back to the client
    const userWithOutPassword = await Users.findById(newUser._id).select(
      "-password"
    );
    if (!userWithOutPassword)
      return res.status(404).json({ message: "User not found." });
    genTokenAndSetCookie(userWithOutPassword._id, res);
    res.status(201).json(userWithOutPassword);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate({ email, password });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect email adress." });
    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Incorrect password." });
    genTokenAndSetCookie(user._id, res);
    const userWithOutPassword = await Users.findById(user._id).select(
      "-password"
    );
    if (!userWithOutPassword)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(userWithOutPassword);
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  try {
    res.cookie("xToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
};

export { signup, login, logout };
