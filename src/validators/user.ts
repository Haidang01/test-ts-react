import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.number().allow(null),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required(),
  role: Joi.number().allow(null),
});
