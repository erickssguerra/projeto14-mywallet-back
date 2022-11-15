import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import bcrypt from "bcrypt"
import joi from "joi"

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
const schemaUser = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email()
})

// route "/sign-up"
server.post("/sign-up", async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).send({ message: "Preencha todos os campos!" })
        return
    }
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const validation = schemaUser.validate({ name, email }, { abortEarly: false })

    if (validation.error) {
        const errorMessage = validation.error.details.map((detail) => detail.message)
        res.status(422).send(errorMessage)
        return
    }

    try {
        const userExists = await colUsers.findOne({ email })

        if (!userExists) {
            await colUsers.insertOne({ name, email, password: cryptedPassword })
            res.status(201).send({ message: "Usuário cadastrado com sucesso!" })
            return
        }

        else {
            res.status(401).send({ message: "E-mail já cadastrado." })
            return
        }
    }

    catch (err) {
        console.log(err)
    }
})

// connection
server.listen(5000, () => {
    console.log("Connected in port 5000!")
})


