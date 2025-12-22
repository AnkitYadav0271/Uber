
import { Router } from "express";
import {
  authProfileController,
  loginUserController,
  logoutUserController,
  registerUser,
} from "../controllers/user.controller.js";
import { registerUserValidator } from "../validator/register.user.validator.js";
import { loginUserValidator } from "../validator/login.user.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/register", registerUserValidator, registerUser);

router.post("/login", loginUserValidator, loginUserController);
router.get("/profile",authMiddleware,authProfileController);
router.post("/logout",logoutUserController);

export default router;
