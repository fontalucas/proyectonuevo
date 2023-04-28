const OrdersService = require("../service/ordersService")

const ordersService = new OrdersService

class OrdersController {
    getOrders = async (req, res) =>{
        try {
            let orders = await ordersService.getOrders()
            res.status(200).json(orders)
        } catch (error) {
            console.log(error);
        }
    }
    getOrder = async (req, res) =>{
        try {
            const {oid} = req.params
            const order = await ordersService.getOrder(oid)
            res.status(200).json(order)
            
        } catch (error) {
            console.log(error);
        }
    }
    createOrder = async (req, res) =>{
        try {
            const {body} = req
            console.log(body);
            const resp = await ordersService.createOrder(body)
            res.status(200).json(resp)
            
        } catch (error) {
            console.log(error);
        }
    }
    updateOrder(){}
    deleteOrder(){}
}

module.exports = OrdersController