const {User} = require('../models/users'); 
const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const cors = require('cors');

router.post('/', cors(), async (req, res) => {

    try {
        const { error } = validate(req.body);
        if ( error ) 
            return res.status(400).send(error.details[0].message);
        
        let user = await User.findOne({email: req.body.email});
        if (!user) 
            return res.status(400).send('Niepoprawny email lub hasło.');
        
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(400).send('Niepoprawny email lub hasło.');

        const token = user.generateAuthToken();
        res
          .status(200)
          .set('Access-Control-Allow-Origin', '*')
          .send({token: token, user: { id: user.id, name: user.name, surname: user.surname, email: user.email}});
      } catch (err) {
        console.log(err.message);
        res.status(404).send(err.message);
      }
    
      res.status(200).end('wyświetlono');
});

function validate(req){
    const schema = {
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req, schema);

}


module.exports = router;