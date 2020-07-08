//chave privada pra senha 
global.SALT_KEY = '1200-2231-22321-ife'

global.EMAIL_TMPL = 'Olá <strong>{0}</strong> Bem vindo meu brother(a)!!'

module.exports = {
    connectionString : "mongodb+srv://matheus:matheus@api-db.rfczh.azure.mongodb.net/api-DB?retryWrites=true&w=majority",
    sendgridKey : "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",
    containerConnectionString : "TBD"
}