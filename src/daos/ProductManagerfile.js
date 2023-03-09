const fs = require('fs');

//const path = './src/mockDB/products.json';

module.exports = class ProductManager {
    constructor() {
        this.path = path
    }
    addProduct = (newProduct) => {
        
        let productDb = this.getProduct()
        let data = productDb.find(product => product.code === newProduct.code)
        
        if (newProduct.title === '' || newProduct.description === '' || newProduct.price === '') {
            return 'Llenar bien los campos'
        }
        if (data) {
            return 'Se encuentra el producto'
        } 
        if (productDb.length === 0) {
            newProduct.id = 1
            productDb.push(newProduct)
        } else {
            productDb = [... productDb, {... newProduct, id: productDb[productDb.length - 1].id + 1}]
        }
        fs.writeFileSync(this.path, JSON.stringify(productDb, null, '\n'), (err) => {
            if (!err) {
            console.log('Producto agregado');
            }
            else {
                console.log(err)
            }
        })
    }
    getProduct = () => {
        if (fs.existsSync(this.path)) {
            let data = fs.readFileSync(this.path, 'utf-8',)
            let productDb= JSON.parse(data);
                return productDb
            }
        else {
            fs.writeFileSync(this.path, '[]', 'utf-8', (err) => {
                if (!err){ 
                    return [] 
                }
                else {
                    console.log(err)
                }
            })
        }
    }
        
    
    getProductById = (id) => {
        let data = fs.readFileSync(this.path, 'utf-8', (err) => {
        let productDb = JSON.parse(data).find(product => product.id === id)
            console.log(err)
            if (!productDb) {
                console.log('Not Found')
            }
            return productDb
        })
    }

    updateProduct = (id, obj) => {
        let data = fs.readFileSync(this.path, 'utf-8')
        let productDb = JSON.parse(data)
        let updateItem = productDb.find(product => product.id === id)
        if ( updateItem === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        updateItem = obj
        obj.id = id
        //productDb[index] = { ...campoActualizar, id: products[index].id }

        fs.writeFileSync(this.path, JSON.stringify(productDb, null,'\n'))
        console.log('Producto actualizado en la base de datos');
    }

    deleteProduct = (id) => {
        let data = fs.readFileSync(this.path, 'utf-8')
        let productDb = JSON.parse(data)
        const index = productDb.findIndex(product => product.id === id)
        if (index === -1) {
            return console.log(`No existe producto con el id: ${id}`)
        }
        productDb.splice(index, 1)
        fs.writeFileSync(this.path, JSON.stringify(productDb, null,'\n'))
        console.log('Producto eliminado de la base de datos');
    }

}