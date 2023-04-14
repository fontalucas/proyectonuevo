const {objConfig, initConnection} = require('../config/conectionMongo')

let ProductDao 
let UserDao
let CartDao

switch (persistence) {
    case 'MONGO':
        initConnection()
        const ProductManagerMongo = require('./mongo/productManagerMongo')
        ProductDao = ProductManagerMongo
        
        const UserManagerMongo = require('./mongo/userManagerMongo')
        UserDao = UserManagerMongo

        const CartManagerMongo = require('./mongo/cartManagerMongo')
        CartDao = CartManagerMongo
        break;

    case 'ARCHIVO':
        
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao
}