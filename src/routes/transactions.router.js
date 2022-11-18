import { Router } from "express";
import { postTransactions, getTransactions, deleteTransaction } from "../controllers/transactions.controllers.js";

const transactionsRouter = Router()
transactionsRouter.post("/transactions", postTransactions)
transactionsRouter.get("/transactions", getTransactions)
transactionsRouter.delete("/transactions/:id", deleteTransaction)
export default transactionsRouter