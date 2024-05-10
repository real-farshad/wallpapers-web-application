import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';

const emailSchema = Joi.string()
  .trim()
  .min(3)
  .max(128)
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .required();

const passwordPattern = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?]).{8,32}$`;
const passwordSchema = Joi.string().pattern(new RegExp(passwordPattern)).required();

const signUpSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const validateUser = (user: any) => {
  const { error, value } = signUpSchema.validate(user);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateUser;
