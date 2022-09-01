import joi from 'joi';

const typesOfBenefits = ['groceries','restaurant', 'transport', 'education', 'health'];

const createCardSchema: joi.ObjectSchema = joi.object({
    employeeId: joi.number().min(1).required(),
    number: joi.string().min(1).required(),
    cardholderName: joi.string().min(1).required(),
    securityCode: joi.string().min(1).required(),
    expirationDate: joi.date().raw().required(),
    password: joi.string().min(1).optional(),
    isVirtual: joi.boolean().required(),
    originalCardId: joi.number().min(1).optional(),
    isBlocked: joi.boolean().required(),
    type: joi.valid(...typesOfBenefits).required(),
})

export default createCardSchema;