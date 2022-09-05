import joi from 'joi';

const purchasePOSSchema: joi.ObjectSchema = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/).required(),
    businessId: joi.number().min(1).required(),
    amount: joi.number().positive().required()
});

export default purchasePOSSchema;