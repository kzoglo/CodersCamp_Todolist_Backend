const mongoose = require('mongoose');
const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
const members = require('./routes/members');
const auth = require('./routes/auth');
const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();
const https = require('https');
const fs = require('fs');

// app.use(cors());

const privateKey = fs.readFileSync('server.key');
const cert = fs.readFileSync('server.cert');

if (!config.get('jwtPrivateKey')) {
  console.log('ERROR - jwtPrivateKey: Klucz prywatny nie został ustawiony');
  process.exit(1);
}

mongoose
  .connect('mongodb://localhost/toDoList')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/members', members);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
https
  .createServer({ key: privateKey, cert: cert })
  .listen(port, () => console.log(`Listening on port ${port}...`));
