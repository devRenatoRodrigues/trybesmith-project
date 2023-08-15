import Joi from 'joi';

const newProductSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': 'INVALID_DATA|"name" is required',
    'string.base': 'UNPROCESSABLE_CONTENT|"price" must be a string',
    'string.min': 'UNPROCESSABLE_CONTENT|"name" length must be at least {#limit} characters long',
  }),
  price: Joi.string().min(2).required()
    .messages({
      'any.required': 'INVALID_DATA|"price" is required',
      'string.base': 'UNPROCESSABLE_CONTENT|"price" must be a string',
      'string.min':
       'UNPROCESSABLE_CONTENT|"price" length must be at least {#limit} characters long',
    }),
});

export default newProductSchema;
