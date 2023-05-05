const CartModel = require("../../models/cart.model")


module.exports = class CartManagerMongo {
    async createCart(){
        try{
            const cart = await CartModel.create({products: []})
            console.log(cart)
            return cart
        }catch(err){
            console.log(err)
        }
    }

    async getCartProducts(cid, limit, page){
        try {
            const cartProducts = await CartModel.paginate({_id: cid}, {limit: limit, page: page, lean: true})
            console.log(cartProducts)
            return cartProducts
        } catch (error) {
            console.log(error)
        }
    }

    async uploadProduct(cid, pid){
        try{
            const cartComplete = await CartModel.findOne({_id: cid})
            cartComplete.products.findOneAndUpdate({product: _id}, {_id: pid})
            if (cartComplete.products === undefined) {
                return console.log("Carrito sin productos")
            }
        }catch(err){
            console.log(err)
        }
    }

    async uploadArrayProduct(cid, product){
        try {
            const arrayProduct = await CartModel.updateOne({_id: cid}, {$set: product})
            return arrayProduct
        } catch (error) {
            
        }
    }

    async deleteProduct(cid, pid){
        try{
            const cartComplete = await CartModel.findOne({_id: cid})
            cartComplete.products.findOneAndDelete(product => product.pid = pid)
            console.log(products)
        }catch(err){
            console.log(err)
        }
    }

    async deleteArrayProduct(cid, product){
        try {
            const arrayProduct = await CartModel.deleteOne({_id: cid}, {$set: product})
            return arrayProduct
        } catch (error) {
            
        }
    }
}

/* let resp = await UserModel.find().explain('executionStats')
console.log(resp.executionStats) */

/* const resp = await CartModel.create({})
console.log(resp)

const cart = await CartModel.find({_id: '63fe933c5aa77c6c976cfe91'})
cart.products.push({product: '63fe8f6e8ed1c7163c2cfeb4'})
console.log(JSON.stringify(cart, null, 2)) */

//let resp = await CartModel.findOneAndUpdate()

//const resp = await ProductModel.findById(/* aca va el  _id */)
//console.log(resp)