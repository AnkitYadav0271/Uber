import userModel from "../model/user.model.js";
import { validationResult } from "express-validator";
import { registerUserService } from "../services/user.services.js";

export function sayHi(req, res) {
  res.send("Hi server :)");
}

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
  console.log("logging user here:)",user);
  const token = await user.generateAuthToken();
  return res.status(200).json({user,token});
};
