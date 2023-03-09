const { Router } = require('express');
const ProductModel = require('../models/productos.model');

const router = Router()
//const Product = new ProductModel


router.get('/', async (res, req) => {
    // esto estara en un metodo de ProductManager
    const products = await ProductModel.find({})

    res.send(products)
})
router.post('/', async (res, req) => {
    const { title, price, category } = req.body
    // esto estara en un metodo de ProductManager
    const products = await ProductModel.create({
        title,
        price,
        category
    })
    res.json(products)
})




module.exports = router