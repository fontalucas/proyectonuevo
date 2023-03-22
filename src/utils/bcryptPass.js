const bcrypt = require('bcrypt')

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// salt es un strin que se agrega al password para hacerlo mas seguro
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password) // <- true o false 

module.exports = {
    createHash,
    isValidPassword
}
