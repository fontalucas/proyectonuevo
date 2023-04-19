

module.exports = class OrdersService {
    constructor(orderDao) {
        this.orderDao = orderDao
    }
    async getOrders(){
        return await this.orderDao.get()
    }
    async getOrder(oid){
        return await this.orderDao.getOrder(oid)
    }
    async createOrders(){
        return await this.orderDao.create()
    }
}