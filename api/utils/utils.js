import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log("Error while hashing password: ", error.message);
  }
};
export const comparePassword = async (password, hashPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    console.log("Error while compareing passwords: ", error.message);
  }
};

export const genTokenAndSetCookie = (id, res) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("xToken", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, // MS
      httpOnly: true, // prevent xss attacks cross-site scripting attacks
      sameSite: "strict",
      secure: process.env.STATUS !== "dev",
    });
  } catch (error) {
    console.log("Error while generating token and set cookie: ", error.message);
  }
};
