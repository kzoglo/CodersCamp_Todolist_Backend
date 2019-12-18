const Joi = require('joi');
const mongoose = require('mongoose');

const Project = mongoose.model(
  'Project',
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    id_task: {
      type: [String],
      // required: true,
      minlength: 1
    },
    owner: {
      type: String,
      required: true,
      minlength: 1
    },
    stage: {
      type: String,
      enum: ['In progress', 'Finished'],
      default: 'In progress'
      // required: true
    },
    deadline: {
      type: String,
      default: Date.now.toString()
    },
    isActive: {
      type: Boolean,
      default: true
    }
  })
);

function validateProject(project) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(255)
      .required(),
    // id_task: Joi.array().items(Joi.number().min(1)), //.required()),
    owner: Joi.string()
      .min(1)
      .required(),
    // stage: Joi.string().valid('In progress', 'Finished'), //.required(),
    deadline: Joi.string()
  };

  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
