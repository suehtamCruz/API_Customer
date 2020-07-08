const mongoose = require('mongoose');
const Order = mongoose.model('Order')
const validator = require('../validators/validator')
const repository =  require('../repositories/order-repository')
const guid =require('guid');
const { query } = require('express');
const authService = require('../services/web-auth');

exports.createNewOrder = async (require,response,next)=>{
    try{

        const token = require.body.token || require.query.token|| require.headers['x-acess-token'];

        const data = await authService.validatiorToken(token);

        await repository.createOrder({
            customer : data.id,
            number : guid.raw().substring(0,8),
            items:require.body.items     
        })
        response.status(201).send({
            message : "ORDER CREATED"
        })
    }catch(e){
        response.status(500).send({
            message : "THE REQUEST IS BAD!",
           
        })
        console.log(e)
    }
}
exports.getAllOrders = async(require,response,next)=>{
    try{
        let getAll = await repository.getOrder()
        response.status(200).send(getAll)

    }catch(e){
        response.status(500).send(e)
        console.log(e)
    }
}