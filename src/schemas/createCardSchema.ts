import joi from 'joi';

const typesOfBenefits = ['groceries','restaurant', 'transport', 'education', 'health'];

const createCardSchema: joi.ObjectSchema = joi.object({
    type: joi.valid(...typesOfBenefits).required(),
})

export default createCardSchema;