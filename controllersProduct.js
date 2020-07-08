const mongoose = require('mongoose');
const product = require('../models/product');
const Product = mongoose.model('Product')
const validator = require('../validators/validator')
const repository =  require('../repositories/product-repository')

//metodo GETALL - Lista todos os produtos
exports.getAll = async(require,response,next) => {
    try{
        let data = await repository.getAll()
        response.status(200).send(data) 
    }
    catch (e) {
        response.status(500).send({
            message:"the request is bad"
        })
    }   
}

//GET BY SLUG - lista pela slug
exports.getBySlug = async(require,response,next) => {
    try {
        let data = await repository.getBySlug(require.params.slug)
        response.status(200).send(data)
    }catch(e){
        response.status(500).send({
            message:"the request is bad"
        })
    }
}

//GET BY ID - lista pelo id
exports.getById = async (require,response,next) => {
    
    try{
        let data = await repository.findById(require.params.id)
        response.status(200).send(data)
    }catch(e){
        response.status(500).send({
            message : "error"
        })
    }
}   

//GET BY TAGS - lista pela tag 
exports.getByTag = async (require,response,next) => {
   try{
        let data = await repository.getByTag(require.params.tag)
        response.status(200).send(data)
    }catch(e){
        response.status(500).send({
            message:"error"
        })
    }
}

//metodo POST - cria um novo produto
exports.createNewProduct= async(require,response,next) => {
    const createValidator = new validator()

    createValidator.hasMinLen(require.body.title,3,'Title require 3 or more than 3 caracters')
    createValidator.hasMinLen(require.body.slug,5,'Slug require 5 or more than 5 caracters')
    createValidator.hasMinLen(require.body.description,6,'Description require 6 or more than 6 caracters')
    createValidator.hasMinLen(require.body.tags,2,'Tags require 2 or more than 2 tags')

    if(!createValidator.isValid()){
        response.status(400).send(createValidator.errors()).end()
        return 
    }
    try{
        await repository.create(require.body)
        response.status(201).send({
            message:"Produto cadastrado com sucesso!"
        })
    }catch (e) {
        response.status(500).send({
            message: "Erro ao cadastrar o produto",
            data : e
        })
    }
   
}

//metodo PUT - atualiza produto pelo ID
exports.UpdateProductById = async(require,response,next) => {

    try{
        await repository.updateProduct(require.params.id,require.body)
        response.status(200).send(`Produto "${require.body.title}" atualizado com sucesso.`)
    }catch(e){
        response.status(500).send({
            message:"Error",
           
        })
    }

}
//metodo DELETE - deleta pelo ID
exports.delete = async(require,response,next) => { 
   
    try{
        await repository.deleteProduct(require.body.id)
        response.status(200).send(`Produto removido com sucesso.`)
    }catch(e){
        response.status(400).send("Falha ao remover o produto " + e)
    }
}
