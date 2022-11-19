import { colUsers } from "../database/collections.js"
import bcrypt from "bcrypt"

export async function signInValidation(req, res, next) {
    const { email, password } = req.body
    try {
        const user = await colUsers.findOne({ email })
        if (!user) {
            res.status(401).send({ message: "Usuário não cadastrado" })
            return
        }
        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).send({ message: "Senha incorreta!" })
            return
        }
        res.locals.validatedUser = user
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
    next()
}