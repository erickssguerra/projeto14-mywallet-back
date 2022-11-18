import { colUsers, colSessions } from "../database/collections.js"

export async function postSignIn(req, res) {
    const { email, password } = req.body
    const token = tokenGenerator()
    try {
        const user = await colUsers.findOne({ email })
        if (user && bcrypt.compareSync(password, user.password)) {
            await colSessions.insertOne({ token, userId: user._id })
            res.status(200).send({ token, name: user.name })
        }
        else {
            res.status(401).send({ message: "Usuário ou senha incorretos!" })
        }
    }
    catch (err) {
        console.log(err)
    }
}