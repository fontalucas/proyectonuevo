const  orderDao = require('../daos/mongo/orderManagerMongo')



class OrdersService {

    async getOrders(){
        return await orderDao.getOrders()
    }
    async getOrder(oid){
        return await orderDao.getOrder(oid)
    }
    async createOrders(newOrder){
        return await orderDao.create(newOrder)
    }
}

module.exports = OrdersService