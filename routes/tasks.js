const { Task, validate } = require('../models/tasks');
const express = require('express');
const router = express.Router();

/****** Assistive functions ******/
const handleError = (err, res) => {
  res
    .status(500)
    .send(`<h3>Error 500: Internal server Error</h3><h2>${err.message}</h2>`);
};

const handleSuccess = res => {
  res.status(200).send(`<h3>Document successfully saved!</h3>`);
};

/****** ROUTES HANDLERS ******/
router.get('/default', (req, res) => {
  res.end();
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  console.log(req.body);
  const {
    descrShort,
    descrLong,
    dateStart,
    dateEnd,
    category,
    weight,
    status,
    assigned
  } = req.body;

  let task = new Task({
    descrShort,
    descrLong,
    dateStart,
    dateEnd,
    category,
    weight,
    status,
    assigned
  });

  task = await task.save();

  task.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });

  console.log(task);
});

router.put('/:id', async (req, res) => {});

router.delete('/:id', async (req, res) => {});

router.get('/:id', async (req, res) => {});

module.exports = router;
