import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { AppError } from "../utils/central.error.handler.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized access");
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = decoded._id;
    req.userId = user;
    return next();
  } catch (err) {
    next(AppError.from(err, 401, "TRYING_TO_LOGIN_WITH_COOKIE"));
  }
};
