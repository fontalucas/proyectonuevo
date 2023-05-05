const UserModel = require('../../models/userModel.js')

module.exports = class UserManagerMongo {
    constructor() {
        this.userModel = UserModel
    }

    getAllUsers = async () => {
        try {
            let users = await this.userModel.find({})
            return users
        } catch (error) {
            console.log(error);
        }
    }

    createUser = async () => {
        try {
            return await this.userModel.create(newUser)
        } catch (error) {
            return error
        }
    }

    getUser = async () => {
        let user =  await this.userModel.findOne({_id: id, email: emial})
        return user
    }

}

