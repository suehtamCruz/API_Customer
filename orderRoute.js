const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerOrder')
const {authorize} = require('../services/web-auth');

router.post('/',authorize,controller.createNewOrder)
router.get('/',authorize,controller.getAllOrders) 

module.exports = router