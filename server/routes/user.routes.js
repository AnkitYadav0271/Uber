
import { Router } from "express";
import {
  loginUserController,
  registerUser,
  sayHi,
} from "../controllers/user.controller.js";
import { registerUserValidator } from "../validator/register.user.validator.js";
import { loginUserValidator } from "../validator/login.user.validator.js";

const router = Router({ mergeParams: true });

router.get("/hi", sayHi);
router.post("/register", registerUserValidator, registerUser);

router.post("/login", loginUserValidator, loginUserController);

export default router;
