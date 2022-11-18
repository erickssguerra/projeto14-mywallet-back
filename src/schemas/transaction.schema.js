import joi from "joi"

const schemaTransaction = joi.object({
    price: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().valid("deposit", "withdraw").required(),
    day: joi.string().length(5).required()
})

export default schemaTransaction