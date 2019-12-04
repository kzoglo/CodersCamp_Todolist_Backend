const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  surname: { 
    type: String,  
    required: true,
    minlength: 3,
    maxlength: 255
  },
  email: { 
    type: Number, 
    required: true,
    unique: true,
    min: 0,
    max: 255
  },
  password: { 
    type: String, 
    required: true,
    min: 5,
    max: 255
  }
}));

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    surname: Joi.string().min(3).max(255).required(),
    email: Joi.string().min().max(255).required().unique().email(),
    password: Joi.number().min(5).max(255).required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;