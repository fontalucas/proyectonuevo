process.on('exit', code => {
    console.log('Este cod se ejecutara justo antes de salir del proceso');
})

process.on('uncaughtException', exception => {
    console.log('Este cod atrapa todas las excepciones no controladas como llamar a una funcion que no haya sido declarado');
})

console('excepcion') //da error