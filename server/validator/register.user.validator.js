import { body } from "express-validator";
export const registerUserValidator = [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("firstName should be more than 3 chars"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be 8 Chars long"),
  ];