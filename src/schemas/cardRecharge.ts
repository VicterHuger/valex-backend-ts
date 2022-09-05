import joi from 'joi';

const cardRechargeSchema:joi.ObjectSchema = joi.object({
    amount: joi.number().positive().required()
});

export default cardRechargeSchema;