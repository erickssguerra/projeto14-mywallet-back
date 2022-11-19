import bcrypt from "bcrypt"
import { colUsers } from "../database/collections.js"

export async function postSignUp(req, res) {
    const { name, email, password } = req.user

    const cryptedPassword = bcrypt.hashSync(password, 10)

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
}

