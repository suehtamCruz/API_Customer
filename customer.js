const mongoose = require('mongoose')
const SchemaPad = mongoose.Schema

const schema = new SchemaPad({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    roles : [{
        type:String,
        required:true,
        enum:["user","admin"],
        default :"user"
    }]
})
module.exports = mongoose.model('Customer',schema)
