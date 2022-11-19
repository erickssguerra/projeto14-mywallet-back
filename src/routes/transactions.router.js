import { Router } from "express";
import { postTransactions, getTransactions, deleteTransaction } from "../controllers/transactions.controllers.js";
import { transactionValidation } from "../middlewares/transactionValidation.middleware.js"
import { userAuthorization } from "../middlewares/userAuthorization.middleware.js"
import { deleteAuthorization } from "../middlewares/deleteAuthorization.middleware.js";

const transactionsRouter = Router()
transactionsRouter.use(userAuthorization)
transactionsRouter.post("/transactions", transactionValidation, postTransactions)
transactionsRouter.get("/transactions", getTransactions)
transactionsRouter.delete("/transactions/:id", deleteAuthorization, deleteTransaction)
export default transactionsRouter