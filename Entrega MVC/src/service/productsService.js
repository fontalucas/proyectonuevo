const ProductsDao = require('../daos/mongo/productManagerMongo')
const productsDao = new ProductsDao

class ProductsService {
    async getProducts(limit){
        return productsDao.getProducts(limit)
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
