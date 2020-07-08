const express = require('express')
const router = express.Router()
const authService = require('../services/web-auth')

//controlador de rotas 
const controller = require('../controllers/controllersProduct')


//metodo GET Lista todos os produtos
router.get('/',controller.getAll)
// Metodo GetBySlug - lista produtos pela slug
router.get('/:slug',controller.getBySlug)
// metodo GetByTags
router.get('/seller/:tag',controller.getByTag)
// metodo GetById
router.get('/admin/:id',controller.getById)
//metodo post create new product
router.post('/',authService.isAdmin,controller.createNewProduct)
// metodo put
router.put('/:id',authService.isAdmin,controller.UpdateProductById)
//metodo delete
router.delete('/',authService.isAdmin,controller.delete)

module.exports = router