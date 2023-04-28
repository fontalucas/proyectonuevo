const { UserDao, OrderDao, CartDao, ProductDao } = require('../daos/factory.js') //manager

const UserService = require('./userService.js') //service
const OrdersService = require('./ordersService.js')
const ProductService = require('./productService.js')
const CartService = require('./cartService.js')


const ordersService = new OrdersService(OrderDao)
const userService = new UserService(UserDao)
const productService = new ProductService(ProductDao)
const cartService = new CartService(CartDao)


module.exports = {
    userService,
    ordersService,
    productService,
    cartService
}