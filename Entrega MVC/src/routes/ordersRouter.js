const {Router} = require ('express')
const  OrdersController = require('../controller/ordersController')

const ordersController = new OrdersController

const router = Router()

router
    .get('/', ordersController.getOrders)
    .get('/:oid', ordersController.getOrder,)
    .post('/', ordersController.createOrder)
    .delete('/:oid', ordersController.deleteOrder)
    .put('/:oid', ordersController.updateOrder)

module.exports = router