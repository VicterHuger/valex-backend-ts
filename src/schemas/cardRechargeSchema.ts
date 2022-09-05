import joi from 'joi';

const amountSchema:joi.ObjectSchema = joi.object({
    amount: joi.number().positive().required()
});

export default amountSchema;