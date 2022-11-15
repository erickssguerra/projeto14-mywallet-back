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

// validation schemas
const userSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email(),
})

// route "/sign-up"
server.post("/sign-in", async (req, res) => {
    const { name, email, password } = req.body
    
})

// connection
server.listen(5000, () => {
    console.log("Connected in port 5000!")
})

