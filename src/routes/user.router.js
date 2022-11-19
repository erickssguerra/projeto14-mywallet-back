import { Router } from "express";
import { postSignUp } from "../controllers/user.controllers.js";
import { signUpValidation } from "../middlewares/signUpValidation.middleware.js";

const userRouter = Router()
userRouter.post("/sign-up", signUpValidation, postSignUp)
export default userRouter
