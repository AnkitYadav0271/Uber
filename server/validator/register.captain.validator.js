import { body } from "express-validator";

export const registerCaptainValidator = [
  body("email").isEmail().withMessage("Invalid Email"),
  body("firstName")
    .isLength({ min: 3 })
    .withMessage("firstName length should be greater than 3"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password length should be more than 8"),
  body("vehicleType")
    .isIn(["car", "auto", "bike"])
    .withMessage("vehicle should be in : car , bike , auto "),
  body("role").isIn(["captain"]),
  body("plate")
    .isLength({ min: 6 })
    .withMessage("vehicle number length should be more than 6"),
  body("vehicleCapacity")
    .isInt({ min: 2 })
    .withMessage("vehicle capacity should be more than 2"),
  body("color")
    .isLength({ min: 3 })
    .withMessage("color length should be more than 3"),
];
