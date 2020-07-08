const mongoose = require ('mongoose')
const Product = mongoose.model('Product')
const validator = require('../validators/validator')

//get all
exports.getAll = async() =>{
  const res = await Product.find({
        active:true
    },'title price slug description') 
    return res
}
//get by slug
exports.getBySlug = async(slug)=>{
    const res = await Product.findOne({
        slug : slug,
        active:true
    },'title description price tags') 
    return res
}
//find by id
exports.findById = async (id) =>{
    const res = await Product.findById(id) 
    return res 
}
//get by tags
exports.getByTag = async(tag) =>{
    const res = await Product.find({
        tags : tag,
        active : true
    },'title price description tags') 
    return res
}
//post cria produto
exports.create = async (data) => {
    let product = new Product(data)
    await product .save()
}
// metodo de atualizar
exports.updateProduct = async (id,data) =>{
    await Product
    .findByIdAndUpdate(id,{
        $set : {
            title : data.title,
            description : data.description,
            price: data.price
        }
    })
}
//delete by id body 
exports.deleteProduct = async(id) =>{    
    await Product.findOneAndRemove(id) 
    
}