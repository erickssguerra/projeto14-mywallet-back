import express, { json } from "express"
import cors from "cors"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"
import bcrypt from "bcrypt"
import joi from "joi"
import { v4 as tokenGenerator } from "uuid"

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

const schemaTransaction = joi.object({
    price: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("deposit", "withdraw").required(),
    day: joi.string().length(5).required()
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

// route "/sign-in"
server.post("/sign-in", async (req, res) => {
    const { email, password } = req.body
    const token = tokenGenerator()
    try {
        const user = await colUsers.findOne({ email })
        if (user && bcrypt.compareSync(password, user.password)) {
            await colSessions.insertOne({ token, userId: user._id })
            res.status(200).send({ token, name: user.name })
        }
        else {
            res.status(401).send({ message: "Usuário ou senha incorretos!" })
        }
    }
    catch (err) {
        console.log(err)
    }
})

// routes "/transaction"
server.post("/transactions", async (req, res) => {
    const { authorization } = req.headers
    const { price, description, type, day } = req.body
    if (!price || !description) {
        res.status(404).send({ message: "Preencha todos os campos!" })
    }

    const validation = schemaTransaction.validate({ price, description, type, day }, { abortEarly: false })
    if (validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message)
        res.status(401).send(errorMessage)
        return
    }

    const token = authorization?.replace("Bearer ", "")
    if (!token) {
        res.status(401).send({ message: "Você não está mais logado." })
        return
    }
    try {
        const activeSession = await colSessions.findOne({ token })
        if (!activeSession) {
            res.status(401).send({ message: "Você não está mais logado." })
            return
        }
        const activeUser = await colUsers.findOne({ _id: activeSession.userId })
        if (!activeUser) {
            res.status(401).send({ message: "Você não está mais cadastrado." })
            return
        }
        await colTransactions.insertOne({ price, description, type, day, email: activeUser.email })
        res.status(200).send({ message: "Item cadastrado com sucesso!", token })
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

// connection
server.listen(5000, () => {
    console.log("Connected in port 5000!")
})


