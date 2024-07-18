import jwt from "jsonwebtoken";
import Users from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.xToken;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });
    const user = await Users.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default protectRoute;
