import { UserUpdate } from '@src/models/userModel';
import { CustomError } from '@src/utils/CustomError';
import Joi from 'joi';

const usernameSchema = Joi.string().trim().alphanum().min(3).max(32);

const noneLocalUpdateSchema = Joi.object().or('username', 'email', 'password').keys({
  username: usernameSchema,
});

const validateNoneLocalUserUpdate = (user: UserUpdate) => {
  const { error, value } = noneLocalUpdateSchema.validate(user);

  if (error) {
    const errorStatus = 400;
    const errorMessage = error.details[0].message;
    throw new CustomError(errorStatus, errorMessage);
  }

  return value;
};

export default validateNoneLocalUserUpdate;
