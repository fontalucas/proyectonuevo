const OrderModel = require('../../models/order.model')


class OrderManagerMongo {
    async getOrders(){
        try {
            return await OrderModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }
    async getOrder(oid){
        try {
            return await OrderModel.findById(oid)
        } catch (error) {
            new Error(error)
        }
    }
    async createOrder(newOrder){
        try {
            return await OrderModel.create(newOrder)
        } catch (error) {
            new Error(error)
        }
    }
    async deleteOrder(){}
    async updateOrder(){}
}

module.exports = OrderManagerMongo