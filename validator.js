//Validator.js is a library of string validators.

const joi = require('joi');

// Define a schema for validating the request body  

const validateTodo = (req, res, next) => {
  const schema = joi.object({
task: joi.string().min(3).max(100).required(),
Completed: joi.boolean().default(false)
  });

  const {error} = schema.validate(req.body);
  if(error) return res.status(400).json({error: error.details[0].message});
  next();
};

module.exports = validateTodo;