import userModel from "../model/user.model.js";
import { validationResult } from "express-validator";
import {
  authProfileService,
  loginUserService,
  registerUserService,
} from "../services/user.services.js";
import { AppError } from "../utils/central.error.handler.js";

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
    return res.status(200).json({ success: true, data: { user, token } });
  } catch (err) {
    next(err);
  }
};

//________________Login controller ends here _______________________//

//*_________________getProfile controller starts here _______________________//

export const authProfileController = async (req, res, next) => {
  try {
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
