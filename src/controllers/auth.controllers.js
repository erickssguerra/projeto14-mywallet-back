import { v4 as tokenGenerator } from "uuid"
import { colSessions } from "../database/collections.js"

export async function postSignIn(req, res) {
    const user = req.validatedUser
    const token = tokenGenerator()
    try {
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
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}