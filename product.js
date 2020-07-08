const mongoose = require('mongoose')
const SchemaPad = mongoose.Schema

const schema = new SchemaPad({
    title : {
        type : String,
        required : true,
        trim : true
    },
    slug : {
        type : String,
        required:[true,'o slug é obrigatorio!'],
        trim: true,
        index:true,
        unique:true
    },
    description :{
        type : String,
        required:true
    },
    price : {
        type : Number,
        required: true
    },
    active : {
        type : Boolean,
        required:true,
        defalt:true
    },
    tags : [{
        type :String,
        required : true
    }],
    image : {
        type : String,
        required:true,
        trim:true

    }
})

module.exports = mongoose.model('Product',schema)
