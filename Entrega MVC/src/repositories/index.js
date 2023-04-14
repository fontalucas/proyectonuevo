const { UserDao } = require('../daos/factory.js')
const UserRepositories = require('./userRepositories.js')

const userService = new UserRepositories(new UserDao())


module.exports = {
    userService
}