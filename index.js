const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/default.json');

const AuthRouter = require('./routes/auth');
const TodoRouter = require('./routes/todo');

const PORT = process.env.PORT || 8080;

const MONGO_LOGIN = process.env.MONGO_LOGIN;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', AuthRouter);
app.use('/api/todos', TodoRouter);

async function start() {
  try {
    const url = config.mongoUrl.replace(
      'login:password',
      `${MONGO_LOGIN}:${MONGO_PASSWORD}`
    );

    await mongoose.connect(url, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log('SERVER STARTED');
    });
  } catch (err) {
    console.error(err);
  }
}

start();
