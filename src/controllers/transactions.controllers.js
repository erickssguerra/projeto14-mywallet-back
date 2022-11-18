import { colSessions, colUsers, colTransactions } from "../database/collections.js"

export async function postTransactions(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const { price, description, type, day } = req.body

    if (!token) {
        res.status(401).send({ message: "Você não está mais logado." })
        return
    }

    if (!price || !description) {
        res.status(404).send({ message: "Preencha todos os campos!" })
    }

    const validation = schemaTransaction.validate({ price, description, type, day }, { abortEarly: false })
    if (validation.error) {
        const errorMessage = validation.error.details.map(detail => detail.message)
        res.status(400).send(errorMessage)
        return
    }

    try {
        const activeSession = await colSessions.findOne({ token })
        if (!activeSession) {
            res.status(401).send({ message: "Sua sessão expirou. Faça login novamente." })
            return
        }
        const activeUser = await colUsers.findOne({ _id: activeSession.userId })
        if (!activeUser) {
            res.status(401).send({ message: "Você não está mais cadastrado." })
            return
        }
        await colTransactions.insertOne({ price, description, type, day, email: activeUser.email })
        res.status(200).send({ message: "Transação cadastrada com sucesso!" })
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getTransactions(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) {
        res.status(400).send({ message: "Problema na requisição: Authorization Bearer Token" })
        return
    }
    try {
        const activeSession = await colSessions.findOne({ token })
        if (!activeSession) {
            res.status(401).send({ message: "Sua sessão expirou. Faça login novamente." })
            return
        }
        const activeUser = await colUsers.findOne({ _id: activeSession.userId })
        if (!activeUser) {
            res.status(401).send({ message: "Você não está mais cadastrado." })
            return
        }
        const transactions = await colTransactions.find({ email: activeUser.email }).toArray()
        res.status(200).send(transactions)


    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function deleteTransaction(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const { id } = req.params

    if (!token) {
        res.status(401).send({ message: "Você não está mais logado." })
        return
    }
    try {
        const activeSession = await colSessions.findOne({ token })
        if (!activeSession) {
            res.status(401).send({ message: "Sua sessão expirou. Faça login novamente." })
            return
        }
        await colTransactions.deleteOne({ _id: ObjectId(id) })
        res.status(200).send({ message: "Transação apagada com sucesso!" })
        return
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}