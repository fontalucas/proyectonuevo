const UserDTO = require('../dto/userDto')

class UserService {
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

module.exports = UserService