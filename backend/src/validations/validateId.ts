import Joi from 'joi';
import { ObjectId } from 'mongodb';

const idSchema = Joi.string().min(3).max(64).required();

const validateId = (id: string) => {
  const { error, value } = idSchema.validate(id);
  if (error) return { error: error.details[0].message };

  const isValidId = ObjectId.isValid(value);
  if (!isValidId) return { error: 'Invalid id!' };

  return { validId: value };
};

export default validateId;
