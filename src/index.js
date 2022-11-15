import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"

// configs
dotenv.config()
const mongoClient = new MongoClient(process.env.MONGO_URI)
try {
    await mongoClient.connect()
    console.log("MongoDB connected!")
} catch (err) {
    console.log(err)
}
const dbMyWallet = mongoClient.db("myWallet")
const server = express()
server.use(cors())
server.use(json())

// collections
const colTransactions = dbMyWallet.collection("transactions")
const colUsers = dbMyWallet.collection("users")
const colSessions = dbMyWallet.collection("sessions")

// connection
server.listen(5000, () => {
    console.log("Connected in port 5000!")
})

