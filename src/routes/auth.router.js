import { Router } from "express";
import { postSignIn } from "../controllers/auth.controllers.js";
import { signInValidation } from "../middlewares/signInValidation.middleware.js";

const authRouter = Router()
authRouter.post("/sign-in", signInValidation, postSignIn)
export default authRouter