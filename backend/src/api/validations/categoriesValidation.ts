import Joi from 'joi';

const categorySchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

const validateCreateCategory = (category: any) => {
  const { error, value } = categorySchema.validate(category);

  if (error) return { error: error.details[0].message };
  return { validCategory: value };
};

const QueryCategoriesSchema = Joi.object({
  page: Joi.number().integer().min(0),
  limit: Joi.number().integer().min(0).max(20),
});

const validateQueryCategories = (query: any) => {
  const { error, value } = QueryCategoriesSchema.validate(query);

  if (error) return { error: error.details[0].message };
  return { validQuery: value };
};

const validateUpdateCategory = (categoryUpdate: any) => {
  const { error, value } = categorySchema.validate(categoryUpdate);
  if (error) return { error: error.details[0].message };

  return { validUpdate: value };
};

export { validateCreateCategory, validateQueryCategories, validateUpdateCategory };
