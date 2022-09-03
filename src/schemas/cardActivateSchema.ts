import joi from 'joi';

const cardActivateSchema = joi.object({
    securityCode: joi.string().length(3).pattern(/^[0-9]+$/).required(),
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

export default cardActivateSchema;