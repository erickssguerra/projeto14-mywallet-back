import { colUsers } from "../database/collections.js"

export async function postSignUp(req, res) {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400).send({ message: "Preencha todos os campos!" })
        return
    }
    const cryptedPassword = bcrypt.hashSync(password, 10)
    const validation = schemaUser.validate({ name, email }, { abortEarly: false })

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

