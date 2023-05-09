const UserDTO = require('../dto/userDto')
const UserDao = require('../daos/mongo/userManagerMongo')

class UserService {
    constructor() {
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

        async getUser(email){
            return await this.userDao.getUser(email)
        }
    }

module.exports = UserService