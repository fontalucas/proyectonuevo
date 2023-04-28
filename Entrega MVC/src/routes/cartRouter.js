const { Router } = require('express');
const { createTicket, createCart, getCartProducts, uploadProduct, uploadArrayProduct, deleteProduct, deleteArrayProduct } = require('../controller/cartController')
const router = Router()



router.post('/', createCart)
router.get('/:cid', getCartProducts)
router.put('/:cid/product/:pid', uploadProduct)
router.put('/:cid', uploadArrayProduct)
router.delete('/:cid/product/:pid', deleteProduct)
router.delete('/:cid', deleteArrayProduct)
router.post('/:cid/purchase', createTicket)

module.exports = router 