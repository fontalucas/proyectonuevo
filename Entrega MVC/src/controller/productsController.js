const { request } = require('express')
const  ProductsService  = require('../service/productsService')

const productsService = new ProductsService

class ProductsController {
    
    getProducts = async (req = request, res) => {
        try { 
            const {page = 1, limit} = req.query
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, prevLink, nextLink, totalPages} = await productsService.getProducts(limit)
            const products = docs
            
            res.status(200).render('products',{
                status: 'success',
                products,
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
}
    getProductById = async (req = request, res) => {
        try { 
        const {pid} = req.params
        const productById = await productsService.getProductById(pid)
        const products = await productsService.getProducts()

        if(!productById) return res.send(products)

        else {
            res.status(200).send({
            status: 'success',
            productById
        })}
    }catch(err) {
        console.log(err);
    }
}
    addProduct = async (req, res = response) => {
        try{
            let {title, description, price} = req.body
            if (!title || !description || !price) {
                return res.status(404).send({mensaje: 'pasar bien el producto'})
            }
            let result = await productsService.addProduct({
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
    }
    updateProduct = async (req, res = response) => {
        try{
            const { pid } = req.params
            let {title, description, price} = req.body
            
            if (!title || !description || !price) {
                return res.status(404).send({mensaje: 'pasar bien usuarios'})
            }
            let obj = {title, description, price}
            let result = await productsService.updateProduct(
                pid, obj)
            res.status(201).send({
                result,
                status: 'success',
                message: 'se actualizo'
            })
        }catch (err) {
            console.log(err);
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const {pid} = req.params
            await productsService.deleteProduct(pid)
            
            res.status(200).send({
                mensaje: 'producto borrado', 
                })
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {ProductsController}