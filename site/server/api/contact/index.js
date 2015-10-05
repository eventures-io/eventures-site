'use strict';

var express = require('express');
var service = require('./contact.service');

var router = express.Router();

router.post('/', service.sendMessage);


module.exports = router;