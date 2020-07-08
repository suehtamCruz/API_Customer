const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllerCustomer')
const {authorize} = require('../services/web-auth');
//cria novo usuario
router.post('/',controller.createNewCustomer);
//lista todos os usuarios
router.get('/',controller.getByName);

router.post('/authenticate',controller.authenticate);
router.post('/refresh-token',authorize,controller.refreshToken);

module.exports = router