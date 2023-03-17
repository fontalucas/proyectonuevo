const ProductModel = require("../../models/productos.model")


module.exports = class ProductManagerMongo{
    
    newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
    }

    async addProduct({...newProduct}){
        try {
            await ProductModel.create({...newProduct})
            if (newProduct.title === '' || newProduct.description === '' || newProduct.price === '')
                return 'Llenar bien los campos'
        }catch (err) {
            console.log(err)
        }
    }
    async getProduct(category, limit, page, orden){
        try {
            const products = await ProductModel.paginate({category: category}, {limit: 10, page: page})
            console.log(products)
            if (!limit) {
                return products
            }
            await ProductModel.aggregate({$sort:{totalQuantity: -1 || 1}})
            console.log(orden)

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