const {ordersService} = require("../repositories/ordersService")


class OrdersController {
    async getOrders (req, res){
        try {
            let orders = await ordersService.getOrders()
            res.status(200).json(orders)
        } catch (error) {
            console.log(error);
        }
    }
    async getOrder(req, res){
        try {
            const {oid} = req.params
            const order = await ordersService.getOrder(oid)
            res.status(200).json(order)
            
        } catch (error) {
            console.log(error);
        }
    }
    async createOrder(req, res){
        try {
            const {body} = req.body
            const resp = await ordersService.createOrder(body)
            res.status(200).json(resp)
            
        } catch (error) {
            console.log(error);
        }
    }
    updateOrder(){}
    deleteOrder(){}
}

module.exports = new OrdersController()