const { Router } = require('express');
const ProductModel = require('../models/productos.model');

const router = Router()
//const Product = new ProductModel


router.get('/', async (req, res) => {
    // esto estara en un metodo de ProductManager
    const productos = await ProductModel.find({})
    res.json({
        status: 'success',
        payload: productos,
    })
})
router.post('/', async (req, res) => {
    const { title, price, category } = req.body
    // esto estara en un metodo de ProductManager
    const productos = await ProductModel.create({
        title,
        price,
        category
    })
    res.json(productos)
})


module.exports = router