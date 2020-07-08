const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

//post cria customer
exports.create = async (data) => {
    let customer = new Customer(data)
    await customer.save()
}
//lista todos os customers
exports.getByName = async () => {
    const res = await Customer.find({},
        'name email')
    return res
}
exports.authenticate = async (data) => {
    const res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res
}
exports.getById = async (id) => {
    const res = await Customer.findById({ id })
    return res
} 