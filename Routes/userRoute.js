const router = require('express').Router();
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userModel = require('../model/user');
const { registerValidation, loginValidation } = require('./auth');

router.get('/', async(req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.log(chalk.red(`${error}: This occurred when trying to GET users`)); 
  }
});

router.post('/register', async (req, res) => {
  // Validate the form
  const {error} = await registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Check if email exist
  const emailExist = await userModel.findOne({email: req.body.email});
  if(emailExist) {
    return res.status(400).send('Email exist!!');
  };

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const users = await new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword
    });
    users.save();
    console.log(users);
    return res.json(users);
  } catch (error) {
    res.send('Unable to send your request. That is all we know');
    console.log(chalk.red(`${error}: Occurred when trying to register users`));
  };    
});

router.post('/login', async(req, res) => {
  const { error } = await loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  };

  const user = await userModel.findOne({email: req.body.email});
  if(!user) {
    return res.status(400).send('Email not found!!');
  };

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send('Incorrect password');
  } else {
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token)
    //console.log(user)
    //return res.json(user);
  };
});

module.exports = router