import { ObjectId } from "mongodb"
import { colTransactions } from "../database/collections.js"

export async function deleteAuthorization(req, res, next) {
    const { id } = req.params
    const authorizedUser = req.authorizedUser
    try {
        const transaction = await colTransactions.findOne({ _id: ObjectId(id) })
        if (!transaction) {
            res.status(401).send({ message: "Transação não encontrada." })
            return
        }
        if (transaction.email === authorizedUser.email) {
            req.authorizedId = id
        }
        else {
            res.status(401).send({ message: "Você não tem permissão para apagar essa mensagem." })
            return
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}