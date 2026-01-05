import { Router } from "express";
import { registerCaptainValidator } from "../validator/register.captain.validator.js";
import { loginCaptainController, registerCaptainController } from "../controllers/captain.controller.js";
import { loginCaptainValidator } from "../validator/login.captain.validator.js";

const router = Router({ mergeParams: true });

router.post("/register", registerCaptainValidator, registerCaptainController);
router.post("/login",loginCaptainValidator,loginCaptainController)

export default router;
