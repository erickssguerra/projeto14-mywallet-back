import { Router } from "express";
import authRouter from "./auth.router.js";
import userRouter from "./user.router.js";
import transactionsRouter from "./transactions.router.js";

const router = Router()
router.use(authRouter)
router.use(userRouter)
router.use(transactionsRouter)
export default router