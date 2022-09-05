import joi from 'joi';

const cardPasswordSchema:joi.ObjectSchema = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

export default cardPasswordSchema;