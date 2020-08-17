const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const user = require('./Routes/userRoute');

// Database connection
(async function() {
  try {
    await mongoose.connect(process.env.DB_CREDENTIALS,
    { useNewUrlParser: true },
    () => {
      console.log(chalk.yellow('DB connected!!'));
    });
  } catch (error) {
    console.log(chalk.red(`${error}: This occurred in the database`));
  };
}() )

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/user', user);

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(5000, () => {
  console.log(chalk.blue('server is up and running'));
});