import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';
import { UserUpdate } from '.';

const usernameSchema = Joi.string().trim().min(3).max(32);

const emailSchema = Joi.string()
  .trim()
  .min(3)
  .max(128)
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });

const passwordPattern = `^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=[\\]{};':"\\|,.<>/?]).{8,32}$`;
const passwordSchema = Joi.string().pattern(new RegExp(passwordPattern));

const localUserUpdateSchema = Joi.object().or('username', 'email', 'password').keys({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const validateLocalUserUpdate = (user: UserUpdate): UserUpdate => {
  const { error, value } = localUserUpdateSchema.validate(user);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateLocalUserUpdate;
