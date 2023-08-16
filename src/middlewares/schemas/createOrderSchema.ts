import Joi from 'joi';

const newOrderSchema = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'INVALID_DATA|"userId" is required',
    'number.base': 'UNPROCESSABLE_CONTENT|"userId" must be a number',
  }),
  productIds: Joi.array().items(Joi.number().min(1)).required().messages({
    'any.required': 'INVALID_DATA|"productIds" is required',
    'array.base': 'UNPROCESSABLE_CONTENT|"productIds" must be an array',
  }),
});

export default newOrderSchema;
