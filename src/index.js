import express, { json } from "express"
import cors from "cors"

import { MongoClient, ObjectId } from "mongodb"
import bcrypt from "bcrypt"
import joi from "joi"
import { v4 as tokenGenerator } from "uuid"
import { postSignUp } from "./controllers/user.controllers.js"
import { postSignIn } from "./controllers/auth.controllers.js"
import { postTransactions, getTransactions, deleteTransaction } from "./controllers/transactions.controllers.js"

// configs


const server = express()
server.use(cors())
server.use(json())

// collections


// validation schemas




// route "/sign-up"
server.post("/sign-up", postSignUp)

// route "/sign-in"
server.post("/sign-in", postSignIn)

// routes "/transaction"
server.post("/transactions", postTransactions)

server.get("/transactions", getTransactions)

server.delete("/transactions/:id", deleteTransaction)

// connection
server.listen(5000, () => {
    console.log("Connected in port 5000!")
})


