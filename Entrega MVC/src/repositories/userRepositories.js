const UserDTO = require('../dto/userDto')

class UserRepositories {
    constructor(UserDao) {
        this.userDao = UserDao
    }
        getAllUsers(){
            return this.userDao.getAllUsers()
        }
    
        createUser(newUser){
            let newUserNormaliz = new UserDTO(newUser)
            this.userDao.createUser(newUserNormaliz)
            return this.userDao
        }
    }

module.exports = UserRepositories