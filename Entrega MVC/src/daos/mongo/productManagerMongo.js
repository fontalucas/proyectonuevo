const ProductModel = require("../../models/productos.model")


module.exports = class ProductManagerMongo {
    

    async addProduct({title, description, price, thumbnail}){
        try {
            await ProductModel.create({title, description, price, thumbnail})
            if (newProduct.title === '' || newProduct.description === '' || newProduct.price === '')
                return 'Llenar bien los campos'
            if (newProduct) return {...newProduct}
        }catch (err) {
            console.log(err)
        }
    }
    async getProducts(category, limit, page){
        try {
            const products = await ProductModel.paginate(category, {limit: 10, page: page, lean: true})
            console.log(products)
            if (!limit || !category) {
                return products
            }
        }catch(err){
            console.log(err)
        }
    }
        
    
    async getProductById(pid){

        try {
            const product = await ProductModel.findById({_id: pid})
            return product.pid
        }catch(err) {
            console.log(err)
        }
    }

    async updateProduct(pid, obj){
        try {
            const actualizarProduct = await ProductModel.findByIdAndUpdate({_id: pid}, obj)
            return actualizarProduct.pid
        }catch(err) {
            console.log(err)
        }
    
    }

    async deleteProduct(pid){
        try {
            await ProductModel.deleteOne({_id: pid})
            console.log('Producto eliminado de la base de datos');
        }catch(err) {
            console.log(err)
        }
    }
}