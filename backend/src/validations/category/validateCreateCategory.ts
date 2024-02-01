import Joi from 'joi';

const categorySchema = Joi.object({
  title: Joi.string().lowercase().trim().min(3).max(32).required(),
});

const validateCreateCategory = (category: any) => {
  const { error, value } = categorySchema.validate(category);
  if (error) return { error: error.details[0].message };

  return { validCategory: value };
};

export default validateCreateCategory;
