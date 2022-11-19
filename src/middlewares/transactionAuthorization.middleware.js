import { colSessions, colUsers } from "../database/collections.js"

export async function transactionAuthorization(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    if (!token) {
        res.status(401).send({ message: "Problema na Autorização: campo Header faltando." })
        return
    }
    try {
        const activeSession = await colSessions.findOne({ token })
        if (!activeSession) {
            res.status(400).send({ message: "Sua sessão expirou. Faça login novamente." })
            return
        }
        const authorizedUser = await colUsers.findOne({ _id: activeSession.userId })
        if (!authorizedUser) {
            res.status(401).send({ message: "Você não está mais cadastrado." })
            return
        }
        req.authorizedUser = authorizedUser
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}