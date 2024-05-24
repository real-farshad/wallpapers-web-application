import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';
import { UserUpdate } from '.';

const usernameSchema = Joi.string().trim().min(3).max(32);

const noneLocalUpdateSchema = Joi.object({
  username: usernameSchema,
});

const validateNoneLocalUserUpdate = (user: UserUpdate): UserUpdate => {
  const { error, value } = noneLocalUpdateSchema.validate(user);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateNoneLocalUserUpdate;
