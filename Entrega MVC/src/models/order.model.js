const {Schema, model} = require('mongoose')

const orderCollection = 'orders'

const orderSchema = new Schema({  
    name: String,
    size: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "small",
    },
    price: Number,
    quantity: Number,
    category: String,

})

const OrderModel = model(orderCollection, orderSchema)

module.exports = OrderModel