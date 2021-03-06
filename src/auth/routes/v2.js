'use strict';

const express = require('express');
const dataModules = require('../models/index');
const router = express.Router();
const bearerAuth = require('../middleware/bearer')
const permissions = require('../middleware/acl');


router.param('model', (req, res, next) => {
    const modelName = req.params.model;
    if (dataModules[modelName]) {
        req.model = dataModules[modelName];
        next();
    } else {
        next('Invalid Model');
    }
});

router.get('/api/v2/:model', bearerAuth, (req, res) => {
    res.send('this is a new api')
})

router.post('/api/v2/:model', bearerAuth, permissions('create'), (req, res) => {
    res.send('the create success')
})

router.put('/api/v2/:model/:id', bearerAuth, permissions('update'), (req, res) => {
    res.send('its updated')
})

router.delete('/api/v2/:model/:id', bearerAuth, permissions('delete'), (req, res) => {
    res.send('its deleted')
})

module.exports = router;