import Joi from 'joi';

export const productSchema = Joi.object({
  id: Joi.number().allow(null),
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().required().min(1),
  img: Joi.string().required(),
});
