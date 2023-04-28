const {CartService} = require('../service/cartService')

const cartService = new CartService

class CartController {
    createCart = async (req, res) => {
        try {
            await cartService.createCart()
            res.status(200).send({mensaje: "carrito creado"})
        } catch (error) {
            console.log(error);
        }
    }
    getCartProducts = async (res, req) => {
        try {
            const {cid} = req.params
            const cart = await cartService.getCartProducts(cid)
            res.status(201).json({
                message: 'Carrito',
                cart})
        } catch (error) {
            console.log(error)
        }
    }
    uploadProduct = async (req, res) => {
        const {cid, pid} = req.params
        try {
            const cart = await cartService.uploadProduct(cid, pid)
            res.status(200).json({
                mensaje: 'Product agregado al carrito',
                cart
        })
        }  catch (error) {
            console.log(error)
        }
    }
    uploadArrayProduct = async (req, res) => {
        const {cid} = req.params
        const {product} = req.body
        try {
            const cartComplete = await cartService.uploadArrayProduct(cid, product)
            res.status(200).json(cartComplete)
        } catch (error) {
            console.log(error);
        }
    }
    deleteProduct = async (req, res) => {
        const {cid, pid} = req.params
        try {
            const cart = await cartService.deleteProduct(cid, pid)
            res.status(200).json({
                mensaje: 'Product eliminado al carrito',
                cart
                
        })
        }  catch (error) {
            console.log(error)
        }
    }
    deleteArrayProduct = async (req, res) => {
        const {cid} = req.params
        const {product} = req.body
        try {
            const cartComplete = await cartService.deleteArrayProduct(cid, product)
            res.status(200).json(cartComplete)
        } catch (error) {
            console.log(error);
        }
    }
    createTicket = async (req, res) => {
        const {cid} = req.params
        const cart = cartService.getCartProducts(cid)

        if(!cart) return res.status(401).send({
            status: 'error'
        })

        let notTicket = []
        let totalPrice = 0
        for(const item of cart.product) {
            const productStock = item.product.stock
            const quantity = item.quantity

            if(quantity <= productStock ){
                await productService.uploadProduct(item.product._id, {stock: stock - quantity})
                totalPrice += quantity * item.product.price
            } else {
                notTicket.push(item.product._id)
            }
        }

        const ticket = {
            user: req.user,
            amount: totalPrice,
        }
        let result = await cartService.createTicket(ticket)
        
        //eliminar del cart los q ya se compraron
        if (notTicket.length > 0) {
            await cartService.deleteProduct(cid, cart.products.filter(item => !notTicket.includes(item.product._id)))
        } else{
        await cartService.deleteArrayProduct(cid)
        }
        res.json({
            status: 'success',
            payload: result
        })
}
}

module.exports = new CartController()