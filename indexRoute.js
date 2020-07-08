const express = require('express')
const router = express.Router()

router.get('/',(require,response,next)=>{
    response.status(200).send({
        "Title" : "Teste de Server",
        "Version" : "0.0.1",
        "Autor" : "Matheus Cruz"
    })
})  

module.exports = router