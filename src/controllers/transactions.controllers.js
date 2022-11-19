// import schemaTransaction from "../schemas/transaction.schema.js"
import { ObjectId } from "mongodb"
import { colTransactions } from "../database/collections.js"

export async function postTransactions(req, res) {
    const { price, description, type, day } = req.validatedTransaction
    const authorizedUser = req.authorizedUser
    try {
        await colTransactions.insertOne({ price, description, type, day, email: authorizedUser.email })
        res.status(200).send({ message: "Transação cadastrada com sucesso!" })
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getTransactions(req, res) {
    const authorizedUser = req.authorizedUser
    try {
        const transactions = await colTransactions.find({ email: authorizedUser.email }).toArray()
        res.status(200).send(transactions)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteTransaction(req, res) {
    const id = req.authorizedId
    try {
        await colTransactions.deleteOne({ _id: ObjectId(id) })
        res.status(200).send({ message: "Transação apagada com sucesso!" })
        return
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}