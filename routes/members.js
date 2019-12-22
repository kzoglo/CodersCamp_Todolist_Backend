const {Member, validate} = require('../models/members'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('membersget');
});

router.post('/', async (req, res) => {

});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

router.get('/:id', async (req, res) => {

});

module.exports = router; 