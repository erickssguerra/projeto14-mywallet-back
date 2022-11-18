import bcrypt from "bcrypt"
import { v4 as tokenGenerator } from "uuid"
import { colUsers, colSessions } from "../database/collections.js"

export async function postSignIn(req, res) {
    const { email, password } = req.body
    const token = tokenGenerator()
    try {
        const user = await colUsers.findOne({ email })
        if (!user) {
            res.status(401).send({ message: "Usuário não cadastrado" })
            return
        }
        if (user && bcrypt.compareSync(password, user.password)) {
            const previousSession = await colSessions.findOne({ userId: user._id })
            if (!previousSession) {
                await colSessions.insertOne({ userId: user._id, token })
                res.status(200).send({ token, name: user.name })
            }
            else {
                await colSessions.updateOne({ userId: user._id }, { $set: { token } })
                res.status(200).send({ token, name: user.name })
            }
        }
        else {
            res.status(401).send({ message: "Usuário ou senha incorretos!" })
        }
    }
    catch (err) {
        console.log(err)
    }
}