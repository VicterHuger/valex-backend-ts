import joi from 'joi';

const cardActivateSchema = joi.object({
    securityCode: joi.string().min(3).required(),
    password: joi.string().min(4).required()
});

export default cardActivateSchema;