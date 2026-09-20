const joi = require('joi');

const validatePatchTodo = (req, res, next) => {
  const schema = joi.object({
    Completed: joi.boolean().required()
  }).unknown(false);

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message)
    });
  }

  next();
};

module.exports = validatePatchTodo;
