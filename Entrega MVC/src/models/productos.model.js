const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const productCollection = 'products'

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
})

ProductSchema.plugin(mongoosePaginate)

const ProductModel = model(productCollection, ProductSchema)
module.exports = ProductModel

