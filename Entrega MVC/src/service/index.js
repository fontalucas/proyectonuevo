const { UserDao, OrderDao } = require('../daos/factory.js') //manager

const UserService = require('./userService.js') //service
const OrdersService = require('./ordersService.js')


const ordersService = new OrdersService(OrderDao)
const userService = new UserService(UserDao)


module.exports = {
    userService,
    ordersService
}