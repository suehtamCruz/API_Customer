const nodemailer = require('nodemailer');

const config = {
  host:'smtp.mailtrap.io',
  port:25,
  auth:{
    user:'d626ff40b296e6',
    pass:'3ccd9f622ab710'
  }
}
const trasnporter = nodemailer.createTransport(config)

module.exports = trasnporter