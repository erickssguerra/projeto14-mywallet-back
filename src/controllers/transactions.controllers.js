// import schemaTransaction from "../schemas/transaction.schema.js"
import { ObjectId } from "mongodb"
import { colTransactions } from "../database/collections.js"

export async function postTransactions(req, res) {
    const { price, description, type, day } = req.validatedTransaction
    const activeUser = req.activeUser
    try {
        await colTransactions.insertOne({ price, description, type, day, email: activeUser.email })
        res.status(200).send({ message: "Transação cadastrada com sucesso!" })
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getTransactions(req, res) {
    const activeUser = req.activeUser
    try {
        const transactions = await colTransactions.find({ email: activeUser.email }).toArray()
        res.status(200).send(transactions)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteTransaction(req, res) {
    const { id } = req.params
    const activeUser = req.activeUser
    try {
        const transaction = await colTransactions.findOne({ _id: ObjectId(id) })
        if (!transaction) {
            res.status(401).send({ message: "Transação não encontrada." })
            return
        }
        if (transaction.email === activeUser.email) {
            await colTransactions.deleteOne({ _id: ObjectId(id) })
            res.status(200).send({ message: "Transação apagada com sucesso!" })
            return
        }
        else {
            res.status(401).send({ message: "Você não tem permissão para apagar essa mensagem." })
            return
        }
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}