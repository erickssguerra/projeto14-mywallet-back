import { Router } from "express";
import { postTransactions, getTransactions, deleteTransaction } from "../controllers/transactions.controllers.js";
import { transactionValidation } from "../middlewares/transactionValidation.middleware.js"
import { transactionAuthorization } from "../middlewares/transactionAuthorization.middleware.js"

const transactionsRouter = Router()
transactionsRouter.use(transactionAuthorization)
transactionsRouter.post("/transactions", transactionValidation, postTransactions)
transactionsRouter.get("/transactions", getTransactions)
transactionsRouter.delete("/transactions/:id", deleteTransaction)
export default transactionsRouter