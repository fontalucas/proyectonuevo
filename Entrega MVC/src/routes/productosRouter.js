const { response } = require('express')
const { Router } = require('express')
const { ProductsController } = require('../controller/productsController')

const productsController = new ProductsController

const router = Router()

//  http://localhost:8080/api/productos

router.get('/', productsController.getProducts)

//  http://localhost:8080/api/productos/pid
router.get('/:pid', productsController.getProductById)

//  http://localhost:8080/api/productos
router.post('/', productsController.addProduct)

//http://localhost:8080/api/productos/:productId
router.put('/:pid', productsController.updateProduct)

router.delete('/:pid', productsController.deleteProduct)

module.exports = router