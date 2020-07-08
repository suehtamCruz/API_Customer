//normalizar porta, evitar de ficar estática
module.exports = {
     normalizedPort(val) {
        const port = parseInt(val,10)
        if (isNaN(port)){
            return val
        }
        if (port >=0){
            return port
    }
        return false
    }
}