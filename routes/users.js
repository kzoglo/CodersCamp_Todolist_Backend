const {User, validate} = require('../models/users'); 
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
//   const customers = await Customer.find().sort('name');
//   res.send(customers);
    res.send('userget');
});

router.post('/', async (req, res) => {
    const { error } = validate (req.body);
    if ( error ) 
        return res.status(400).send(error.details[0].message);
    
    let user = await User.findOne({email: req.body.email});
    if (user) 
        return res.status(400).send('Użytkownik już istnieje.');
    
    user = new User ({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(user);
});

router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const customer = await Customer.findByIdAndUpdate(req.params.id,
//     { 
//       name: req.body.name,
//       isGold: req.body.isGold,
//       phone: req.body.phone
//     }, { new: true });

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
//   res.send(customer);
});

router.delete('/:id', async (req, res) => {
//   const customer = await Customer.findByIdAndRemove(req.params.id);

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

//   res.send(customer);
});

router.get('/:id', async (req, res) => {
//   const customer = await Customer.findById(req.params.id);

//   if (!customer) return res.status(404).send('The customer with the given ID was not found.');

//   res.send(customer);
});

module.exports = router; 