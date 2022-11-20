import schemaUser from "../schemas/user.schema.js"

export function signUpValidation(req, res, next) {
    const { name, email, password } = req.body
    const { error } = schemaUser.validate({ name, email, password }, { abortEarly: false })
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message)
        res.status(422).send(errorMessage)
        return
    }
    req.validatedForm = { name, email, password }
    next()
}
