module.exports ={
    onListening(){
    const addr = server.addres()
    const bind = typeof addr === 'string'
        ? 'pipe' + addr 
        : 'port' + addr.port
    debug('Listening on' + bind) 
    }
}