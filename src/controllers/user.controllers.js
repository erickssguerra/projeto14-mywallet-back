import bcrypt from "bcrypt"
import schemaUser from "../schemas/user.schema.js"
import { colUsers } from "../database/collections.js"

export async function postSignUp(req, res) {
    const { name, email, password } = req.body

    const cryptedPassword = bcrypt.hashSync(password, 10)
    const validation = schemaUser.validate({ name, email, password }, { abortEarly: false })

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
}

