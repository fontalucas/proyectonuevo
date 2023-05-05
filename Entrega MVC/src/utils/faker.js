const {faker} = require('@faker-js/faker');


faker.locale = 'es'

const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        category: faker.commerce.department(),
        stock: faker.random.numeric(),
        description: faker.commerce.productDescription(),
        id: faker.database.mongodbObjectId(),
        thumbnail: faker.image.business()
    }
}


const generateUser = () => {
    let numeroOfProducts = parseInt(faker.random.numeric(1, {bannedDigits: ['0']}));
    let products = []
    for(let i = 0; i < numeroOfProducts; i++) {
        products.push(generateProducts())
    }
    return {
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        phone: faker.phone.number(),
        sex: faker.name.sex(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        products
    }
}
module.exports = {generateUser, generateProducts}