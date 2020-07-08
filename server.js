//importando módulos externos da padrão 'MODULES'
const portNormal = require('../modules/normalizedPort')
const errors = require('../modules/serverErrors')
const debuger = require('../modules/debug')

// import node modules
const http = require('http')
const express = require('express')
const debug = require('debug')

//importando app do SRC app 
const app = require('../src/app')

// normaliza a porta cria o app e tras o Routes
const port = portNormal.normalizedPort(process.env.PORT || '3000')
const server = http.createServer(app)
const routes = express.Router()

//inicializa o tratamento de erros
server.on('error',errors.onError)
server.on('listening',debuger.onListening)

//atribuiçoes do app
app.set('port',port)
app.listen(port)
console.log(`API RODANDO NA PORTA { ${port} }`)
