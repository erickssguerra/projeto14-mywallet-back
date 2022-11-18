import joi from "joi"

const schemaUser = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().email()
})

export default schemaUser