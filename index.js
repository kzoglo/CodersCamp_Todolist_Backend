const mongoose = require('mongoose');
const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
const members = require('./routes/members');
const express = require('express');
const app = express();
const cors = require('cors');

mongoose
  .connect('mongodb://localhost/todolist')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.options('/api/tasks/:id', cors());
app.use(express.static('./tasks'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/members', members);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
