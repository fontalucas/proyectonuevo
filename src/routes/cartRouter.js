const { Router } = require('express');
const CartModel = require('../models/cart.model');

const router = Router()

router.get('/', async (res, req) => {

    const cart = await CartModel.find({})

    res.json(cart)
})




module.exports = router