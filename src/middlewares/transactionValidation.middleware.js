import schemaTransaction from "../schemas/transaction.schema.js"

export function transactionValidation(req, res, next) {
    const { price, description, type, day } = req.body
    const { error } = schemaTransaction.validate({ price, description, type, day }, { abortEarly: false })
    if (error) {
        const errorMessage = error.details.map(detail => detail.message)
        res.status(400).send(errorMessage)
        return
    }
    next()
}
