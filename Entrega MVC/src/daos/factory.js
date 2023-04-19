const {persistence, initConnection} = require('../config/conectionMongo')

let ProductDao 
let UserDao
let CartDao
let OrderDao

switch (persistence) {
    case 'MONGO':
        initConnection()
        const ProductManagerMongo = require('./mongo/productManagerMongo')
        ProductDao = ProductManagerMongo
        
        const UserManagerMongo = require('./mongo/userManagerMongo')
        UserDao = UserManagerMongo

        const CartManagerMongo = require('./mongo/cartManagerMongo')
        CartDao = CartManagerMongo
        
        const OrderManagerMongo = require('./mongo/orderManagerMongo')
        OrderDao = OrderManagerMongo
        break;

    case 'ARCHIVO':
        
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao
}