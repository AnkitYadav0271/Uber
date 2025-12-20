import express from "express";
import { Router } from "express";
import { registerUser, sayHi } from "../controllers/user.controller.js";
import { validationResult } from "express-validator";
import { registerUserValidator } from "../validator/register.user.validator.js";

const router = Router({ mergeParams: true });

router.get("/hi", sayHi);
router.post(
  "/register",
  registerUserValidator,
  registerUser
);

export default router;
