const { Router } = require('express');
const { CartManagerMongo } = require('../daos/mongo/cartManagerMongo')

const router = Router()
const cartManagerMongo = new CartManagerMongo

// localhost:8080/api/cart
router.post('/', async (req, res) => {
    await cartManagerMongo.createCart()

    res.status(200).send({mensaje: "carrito creado"})
})

// localhost:8080/api/cart/:cid

router.get('/:cid', async (res, req) => {
    const {cid} = req.params
    try {
        const cart = await cartManagerMongo.getCartProducts(cid)
    
        res.status(201).json({
            message: 'Carrito',
            cart})
    } catch (error) {
        console.log(error)
    }
})
// localhost:8080/api/cart/:cid
router.put('/:cid', async (req, res) => {
    const {cid} = req.params
    const {product} = req.body
    try {
        const cartComplete = await cartManagerMongo.uploadArrayProduct(cid, product)
        res.status(200).json(cartComplete)
    } catch (error) {
        console.log(error);
    }
})
//----------------------------------------------------------------
router.delete('/:cid', async (req, res) => {
    const {cid} = req.params
    const {product} = req.body
    try {
        const cartComplete = await cartManagerMongo.deleteArrayProduct(cid, product)
        res.status(200).json(cartComplete)
    } catch (error) {
        
    }
})
// localhost:8080/api/cart/:cid/product/:pid
router.put('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params
    try {
        const cart = await cartManagerMongo.uploadtProduct(cid, pid)
        
        res.status(200).json({
            mensaje: 'Product agregado al carrito',
            cart
            
    })
    }  catch (error) {
        console.log(error)
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params
    try {
        const cart = await cartManagerMongo.deletProduct(cid, pid)
        
        res.status(200).json({
            mensaje: 'Product agregado al carrito',
            cart
            
    })
    }  catch (error) {
        console.log(error)
    }
})
module.exports = router