import { body } from "express-validator";

export const loginUserValidator = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:8}).withMessage("Password length must be greater than 8")
];