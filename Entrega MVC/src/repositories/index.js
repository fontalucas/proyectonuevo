const { UserDao, OrderDao } = require('../daos/factory.js') //manager
const { PorductModel } = require('../models/productos.model.js')
const {OrderModel} = require('../models/order.model.js')

const UserRepositories = require('./userRepositories.js') //service
const OrdersService = require('./ordersService.js')

const ordersService = new OrdersService(new OrderDao(OrderModel))
const userService = new UserRepositories(UserDao) 


module.exports = {
    userService,
    ordersService
}