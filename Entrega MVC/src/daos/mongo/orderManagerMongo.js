const OrderModel = require('../../models/order.model')


class OrderManagerMongo {
    constructor(){
        this.orderModel = OrderModel
    }

    async get(){
        try {
            return await this.orderModel.find({})
        } catch (error) {
            return new Error(error)
        }
    }
    async getOrder(oid){
        try {
            return await this.orderModel.findById({oid})
        } catch (error) {
            new Error(error)
        }
    }
    async createOrder(newOrder){
        try {
            return await this.orderModel.create(newOrder)
        } catch (error) {
            
        }
    }
    async deleteOrder(){}
    async updateOrder(){}
}

module.exports = OrderManagerMongo