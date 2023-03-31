//const {Router} = require('express');
const Router = require('./rutes');

module.exports = class UsersRouter extends Router {
    init(){
        this.get('/'), (req, res) => {
            //if(false) return res.sendUserError('no esta el usuario')
            res.send('Welcome')
        }
    }
}

class ProductManagerMongo extends Router{}
/* const router = Router()

const diccionario = [
    {word: 'hola', lenguaje: 'español'}
]
router.param('word', async (req, res, next, word) =>{
    let searchWord = await diccionario.find(palabra => palabra.word === word)
    if (!searchWord) {
        return req.word = null
    } else {
        req.word = searchWord.word
    }
})
 */

 //byte UTF-8 á == %c3%A1   é == %c3%A9
/* router.get('/:word([a-z%C3%A1]+)', async (req, res) => {
    res.send(req.params.word)
}) */
/* SI AGREGO RUTAS CON FUNCIONES POST, PUT O DELETE, se usara el "modelo" de router.params */
/* router.get('*', async (req, res) => {
    res.statusCode(404).send('no se encuentra la ruta')
}) */


