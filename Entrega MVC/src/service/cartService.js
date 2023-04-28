const cartDao = require('../daos/mongo/cartManagerMongo')


class CartService {
    async createCart(){
        await cartDao.createCart()
    }
    async getCartProducts(cid, limit, page){
        await cartDao.getCartProducts(cid, limit, page)
    }
    async uploadProduct(cid, pid){
        await cartDao.uploadProduct(cid, pid)
    }
    async uploadArrayProduct(cid, product){
        await cartDao.uploadArrayProduct(cid, product)
    }
    async deleteProduct(cid, pid){
        await cartDao.deleteProduct(cid, pid)
    }
    async deleteArrayProduct(cid, product){
        await cartDao.deleteArrayProduct(cid, product)
    }
}

module.exports = CartService
