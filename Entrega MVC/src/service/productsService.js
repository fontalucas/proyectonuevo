const productsDao = require('../daos/mongo/productManagerMongo')

class ProductsService {
    async getProducts(limit, page){
        return productsDao.getProducts(category, limit, page, orden)
    }
    async addProduct(title, description, price, thumbnail){
        return productsDao.addProduct({title, description, price, thumbnail})
    }
    async getProductsById(pid){
        return productsDao.getProductsById(pid)
    }
    async updateProduct(pid, obj){
        return productsDao.updateProduct(pid, obj)
    }
    async deleteProduct(pid){
        return productsDao.deleteProduct(pid)
    }
}
module.exports = ProductsService
