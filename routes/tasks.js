const {Task, validate} = require('../models/tasks'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('tasksget');
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