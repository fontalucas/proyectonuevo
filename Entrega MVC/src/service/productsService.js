const productsDao = require('../daos/mongo/productManagerMongo')

class ProductsService {
    getProducts = () => {
        return productsDao.getProducts()
    }
    addProduct= (title, description, price, thumbnail)=>{
        return productsDao.addProduct(title, description, price, thumbnail)
    }
}

module.exports = new ProductsService()
