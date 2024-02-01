import Joi from 'joi';

const querySchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateQueryCategories = (query: any) => {
  const { error, value } = querySchema.validate(query);
  if (error) return { error: error.details[0].message };

  return { validQuery: value };
};

export default validateQueryCategories;
