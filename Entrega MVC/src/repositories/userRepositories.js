const UserDTO = require('../dto/userDto')
const { UserDao } = require('../daos/factory.js')


class UserRepositories {
        getAllUsers(){
            return UserDao.getAllUsers()
        }
    
        createUser(newUser){
            let newUserNormaliz = new UserDTO(newUser)
            UserDao.createUser(newUserNormaliz)
            return UserDao
        }
    }

module.exports = UserRepositories