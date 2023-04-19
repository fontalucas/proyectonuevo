const {Router} = require ('express')
const {getOrders, createOrder, updateOrder, getOrder, deleteOrder } = require('../controller/ordersController')

const router = Router()

router
    .get('/', getOrders)
    .get('/:oid', getOrder,)
    .post('/', createOrder)
    .delete('/:oid', deleteOrder)
    .put('/:oid', updateOrder)

module.exports = router