const {Schema, model} = require('mongoose')

const productCollection = 'products'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
})


const ProductModel = model(productCollection, ProductSchema)
module.exports = ProductModel

