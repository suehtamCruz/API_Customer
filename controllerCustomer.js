const mongoose = require('mongoose');
const Customer = mongoose.model('Customer')
const validator = require('../validators/validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const emailSender = require('../services/email-service')
const authService = require('../services/web-auth');
const customer = require('../models/customer');

const authKey = global.SALT_KEY;

exports.createNewCustomer = async (require, response, next) => {
    const createValidator = new validator()

    createValidator.hasMinLen(require.body.name, 3, 'Name require 3 or more than 3 caracters')
    createValidator.isEmail(require.body.email, 'E-mail is invalid')
    createValidator.hasMinLen(require.body.password, 6, 'Password require 6 or more than 6 caracters')

    if (!createValidator.isValid()) {
        response.status(400).send(createValidator.errors()).end()
        return
    }
    try {
        //linha 22 à 35 tenta enviar o email e criar o usuario
        const message = {
            from: 'matheuscz3110@gmail.com',
            to: require.body.email,
            subject: "WELLCOME TO SERVER TEST",
            text: global.EMAIL_TMPL
        }
        emailSender.sendMail(message, (e, data) => {
            if (e) {
                return response.status(400).send('the request is bad')
            }
        });

        const cria = await repository.create({
            name: require.body.name,
            email: require.body.email,
            password: md5(require.body.password + authKey),
            roles: ["user"]
        })
        response.status(201).send({
            message: "Usuario cadastrado com sucesso!"
        })


    } catch (e) {
        response.status(500).send({
            message: "Erro ao cadastrar o usuario",
            data: e
        })
    }

}
exports.getByName = async (require, response, next) => {
    try {
        let data = await repository.getByName()
        response.status(200).send(data)
    }
    catch (e) {
        response.status(500).send({
            message: "the request is bad"
        })
    }
}

exports.authenticate = async (require, response, next) => {

    try {

        const auth = await repository.authenticate({
            email: require.body.email,
            password: md5(require.body.password + global.SALT_KEY)
        })
        if (!auth) {
            response.status(404).send({
                message: 'User or password invalids'
            });
            return;
        } else {
            const token = await authService.generateToken({
                id: customer.id,
                email: customer.email,
                name: customer.name,
                roles:customer.roles
            });
            response.status(201).send({
                token: token,
                email: customer.email,
                name: customer.name
            });
        }
    } catch (e) {
        response.status(500).send({
            message: "Erro ao cadastrar o usuario",
            data: e
        })
    }

}
exports.refreshToken = async (require, response, next) => {

    try {

        const token = require.body.token || require.query.token || require.headers['x-acess-token'];

        const data = await authService.validatiorToken(token);
        
        const auth = await repository.getById(require.body.id)
        if (!auth) {
            response.status(404).send({
                message: 'User not found'
            });
            return;

        } else {
            const tokenData = await authService.generateToken({
                id: customer.id,
                email: customer.email,
                name: customer.name,
                roles:customer.roles
            });
            response.status(201).send({
                token: token,
                data: {
                    email: customer.email,
                    name: customer.name
                }

            });
        }
    } catch (e) {
        response.status(500).send({
            message: "Erro ao cadastrar o usuario",
            data: e
        })
    }

}