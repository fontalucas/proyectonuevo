const { response } = require('express')
const { Router } = require('express')
const ProductModel = require('../models/productos.model.js')

const router = Router()

// el get trae http://localhost:8080/api/productos
router.get('/', async (req, res) => {
    try { 
        const {page = 1 } = req.query
        const {payload, hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink, totalPages} = await ProductModel.paginate({}, {limit: 10, page, lean: true})
        
        const products = payload
        
        res.status(200).send('products',{
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink,
        })

    }catch(err) {
        console.log(err);
    }
})



//  http://localhost:8080/api/productos/pid
router.get('/:pid', async (req, res) => {
    try { 
        const {pid} = req.params
        const productById = await ProductModel.getProductById(pid)
        const products = await ProductModel.getProducts()

        if(!productById) return res.send(products)

        res.status(200).send({
            status: 'success',
            productById
        })
    }catch(err) {
        console.log(err);
    }
})

//  http://localhost:8080/api/productos
router.post('/', async (req, res = response) => {
try{

    let {title, description, price} = req.body
    
    if (!title || !description || !price) {
        return res.status(404).send({mensaje: 'pasar bien el producto'})
    }
    let result = await ProductModel.addProduct({
        title,
        description,
        price
    })
    res.status(201).send({
        result,
        message: 'se creo'
    })
}catch (err) {
    console.log(err);
}
})


//http://localhost:8080/api/usuarios/:userId
router.put('/:pid', async (req, res = response) => {
    try{
        const { pid } = req.params
        let {title, description, price} = req.body
        
        if (!title || !description || !price) {
            return res.status(404).send({mensaje: 'pasar bien usuarios'})
        }
        let obj = {title, description, price}
        let result = await ProductModel.updateProduct(
            pid, obj)
        res.status(201).send({
            result,
            status: 'success',
            message: 'se actualizo'
        })
    }catch (err) {
        console.log(err);
    }
    })

router.delete('/:pid', async (req, res) => {

    const {pid} = req.params
    await ProductModel.deleteProduct({_id: pid})
    
    res.status(200).send({
        mensaje: 'producto borrado', 
        })
})

module.exports = router