import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';
import { UserUpdate } from '.';

const usernameSchema = Joi.string().trim().min(3).max(32).required();

const noneLocalUserUpdateSchema = Joi.object({
  username: usernameSchema,
});

const validateOauthUserUpdate = (user: UserUpdate): UserUpdate => {
  const { error, value } = noneLocalUserUpdateSchema.validate(user);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateOauthUserUpdate;
