import { Router } from "express";
import { postSignIn } from "../controllers/auth.controllers.js";

const authRouter = Router()
authRouter.post("/sign-in", postSignIn)
export default authRouter