import { body } from "express-validator";

export const loginCaptainValidator = [
  body("email").isEmail().withMessage("email is required"),
  body("password").isLength({ min: 1 }).withMessage("password is required"),
];
