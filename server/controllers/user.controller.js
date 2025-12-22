import userModel from "../model/user.model.js";
import { validationResult } from "express-validator";
import {
  authProfileService,
  loginUserService,
  logoutUserService,
  registerUserService,
} from "../services/user.services.js";
import { AppError } from "../utils/central.error.handler.js";
import { checkBlackListToken } from "../services/blacklist.token.service.js";

export function sayHi(req, res) {
  res.send("Hi server :)");
}

//*____Register controller is here //
export const registerUser = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  let user = await registerUserService({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const token = await user.generateAuthToken();
  return res.status(200).json({ user, token });
};

//__________________register controller ends here ______________________//

//*_________________Login controller starts here _______________________//

export const loginUserController = async (req, res, next) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ error: error.array() });
  }
  try {
    const user = await loginUserService(req.body);
    let token = await user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

//________________Login controller ends here _______________________//

//*_________________getProfile controller starts here _______________________//

export const authProfileController = async (req, res, next) => {
  try {
    let userId = req.userId;
    if (checkBlackListToken(userId)) {
      throw new Error("Unauthorized access");
    }
    let user = await authProfileService(req);
    return res.status(200).json({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(AppError.from(err, 401, "TRYING_TO_LOGIN_WITH_COOKIES"));
  }
};

//*_________________getProfile controller ends here _______________________//

//*_________________ logout User controller Starts here _______________________//

export const logoutUserController = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Unauthorized");
    }

    await logoutUserService(token);

    res.clearCookie("token");
    return res.status(200).json({ success: true });
  } catch (err) {
    next(AppError.from(err, 401, "TRYING_TO_LOGOUT_USER"));
  }
};

//*_________________ logout User controller Starts here _______________________//
