import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';
import { UserPayload } from '.';

const usernameSchema = Joi.string().trim().alphanum().min(3).max(32).required();

const emailSchema = Joi.string()
  .trim()
  .min(3)
  .max(128)
  .lowercase()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required();

const passwordPattern = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?]).{8,32}$`;
const passwordSchema = Joi.string().pattern(new RegExp(passwordPattern)).required();

const userPayloadSchema = Joi.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const validateUser = (user: UserPayload) => {
  const { error, value } = userPayloadSchema.validate(user);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateUser;
