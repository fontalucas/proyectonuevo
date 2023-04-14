const {UserModel} = require('../../models/userModel.js')

module.exports = class UserManagerMongo {
    constructor() {
        this.userModel = UserModel
    }

    getAllUsers = async () => {
        return await this.userModel.find({})
    }

    createUser = async () => {
        try {
            return newUser
        } catch (error) {
            return error
        }
    }
}

