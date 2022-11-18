import express, { json } from "express"
import cors from "cors"
import { postSignUp } from "./controllers/user.controllers.js"
import { postSignIn } from "./controllers/auth.controllers.js"
import { postTransactions, getTransactions, deleteTransaction } from "./controllers/transactions.controllers.js"

const server = express()
server.use(cors())
server.use(json())

server.post("/sign-up", postSignUp)

server.post("/sign-in", postSignIn)

server.post("/transactions", postTransactions)

server.get("/transactions", getTransactions)

server.delete("/transactions/:id", deleteTransaction)

server.listen(5000, () => {
    console.log("Connected in port 5000!")
})


