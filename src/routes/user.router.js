import { Router } from "express";
import { postSignUp } from "../controllers/user.controllers.js";

const userRouter = Router()
userRouter.post("/sign-up", postSignUp)
export default userRouter
