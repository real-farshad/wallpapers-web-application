import Joi from 'joi';
import { ObjectId } from 'mongodb';

const idSchema = Joi.string().min(3).max(64).required();

const validateId = (id: string) => {
  const { error, value } = idSchema.validate(id);
  if (error) return { error: error.details[0].message };

  const isValidId = ObjectId.isValid(value);
  if (isValidId) return { error: 'Invalid id!' };

  return { validId: value };
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateQueryCategories = (query: any) => {
  const { error, value } = querySchema.validate(query);

  if (error) return { error: error.details[0].message };
  return { validQuery: value };
};

export { validateId, validateQueryCategories };
