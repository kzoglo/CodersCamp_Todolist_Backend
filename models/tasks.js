const Joi = require('joi');
const mongoose = require('mongoose');

/****** Assistive functions ******/
const setToNull = v => {
  if (v === '') v = null;
  return v;
};

/****** SCHEMA and MODEL ******/
const taskSchema = new mongoose.Schema({
  descrShort: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  descrLong: {
    set: v => setToNull(v),
    type: String,
    maxlength: 200
  },
  dateStart: {
    type: Date,
    default: new Date()
  },
  dateEnd: {
    set: v => setToNull(v),
    type: Date
  },
  category: String,
  weight: String,
  status: {
    type: Boolean,
    default: false
  },
  creator: {
    type: String,
    default: null
  },
  assigned: [String]
});

const Task = mongoose.model('Task', taskSchema);

/****** JOI validation ******/
const validate = task => {
  const schema = {
    descrShort: Joi.string()
      .min(3)
      .max(50)
      .required()
      .trim(),
    descrLong: Joi.string().allow(''),
    dateStart: Joi.date(),
    dateEnd: Joi.date().allow(''),
    category: Joi.string(),
    weight: Joi.string(),
    status: Joi.boolean(),
    creator: Joi.alternatives().try(Joi.string(), null),
    assigned: Joi.alternatives().try(Joi.string(), Joi.array())
  };

  return Joi.validate(task, schema);
};

module.exports.validate = validate;
module.exports.Task = Task;
