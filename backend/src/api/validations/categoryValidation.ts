import Joi from 'joi';

const QuerySchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateQueryCategory = (query: any) => {
  const { error, value } = QuerySchema.validate(query);

  if (error) return { error: error.details[0].message };
  return { validQuery: value };
};

export { validateQueryCategory };
