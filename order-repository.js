const mongoose = require ('mongoose')
const Order = mongoose.model('Order')
const validator = require('../validators/validator')


exports.createOrder = async(data)=>{
    let order = new Order(data)
    await order.save()

}
exports.getOrder = async() => {
    var res = await Order.find({},'number status customer items')
    .populate('customer','name email')
    .populate('items.product','title')
    return res
}