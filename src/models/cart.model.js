const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const CartManager = require('../daos/cartManagerfile')

const cartCollection = 'carts'

const CartSchema = new Schema({
    //cart = [CartManager.createCart()]

    /* CLASE MONGO */
    products: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
            }
        }]
    }
})
//_id
//userId{type: Schema.Types.ObjectId
//          ref: 'usuarios'},

CartSchema.pre('find', function(){
    this.populate('products.pid')
})

CartSchema.plugin(mongoosePaginate)
const CartModel = model(cartCollection, CartSchema)

module.exports = CartModel
