//modulos node
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const config = require('./config')

//coneção com o banco
const conection = mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

conection ? console.log('SERVER ON') : console.log('SERVER OFF');

//carregando interação com o banco
const Product = require('./models/product')
const Costumer = require('./models/customer')
const Order = require('./models/order')

//importando rotas 
const indexRoute = require('./routes/indexRoute')
const productsRoute = require('./routes/productsRoute')
const customersRoute = require('./routes/customerRoute')
const orderRoute = require('./routes/orderRoute')

//para todas as requisições virem em formato json
app.use(bodyParser.json({
    limit: '10mb'
}))
app.use(bodyParser.urlencoded({ extended: false }))
//habilita o CORS
app.use(function (require, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,x-access-token');
    response.header('Accss-Contrl_allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    next();
})
//chamadas de utilização do APP
app.use('/', indexRoute)
app.use('/products', productsRoute)
app.use('/customers', customersRoute)
app.use('/orders', orderRoute)

module.exports = app