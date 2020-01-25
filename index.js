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

if (!config.get('jwtPrivateKey')) {
  console.log('ERROR - jwtPrivateKey: Klucz prywatny nie został ustawiony');
  process.exit(1);
}

const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-lowdw.mongodb.net/${process.env.MONGO_DEF_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    app.listen(port, () => console.log(`Listening on port ${port}...`));
    console.log('Connected to MongoDB...');
  })
  .catch(err => console.error(err));

app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/tasks', tasks);
app.use('/api/members', members);
app.use('/api/auth', auth);
require('./startup/prod')(app);
