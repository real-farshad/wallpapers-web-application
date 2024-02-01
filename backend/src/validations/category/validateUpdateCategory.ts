import Joi from 'joi';

const categorySchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

const validateUpdateCategory = (categoryUpdate: any) => {
  const { error, value } = categorySchema.validate(categoryUpdate);
  if (error) return { error: error.details[0].message };

  return { validUpdate: value };
};

export default validateUpdateCategory;
