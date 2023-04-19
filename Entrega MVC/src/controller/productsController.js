const productsService = require('../service/productsService')

module.exports = class ProductsController  {
    addProduct = (req, res) => {
        const product = req.body
        const newProduct = productsService.addProduct(product)
        res.status(200).json(newProduct)
    }
    getProducts = (req, res) => {
        const products = productsService.getProducts()
        res.status(200).json(products)
    }
}