const mongoose = require('mongoose');
const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
const members = require('./routes/members');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/toDoList')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/members', members);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));