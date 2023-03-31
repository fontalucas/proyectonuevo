

function listNumber(...numbres) {
    const types = numbres.map(nro => typeof nro)
    console.log(types)
    if(types.includes('string') || types.includes('boolean')){
        console.log('Parametro invalido: ', types )
        process.exitCode = -4
    }else {
        console.log(numbers);
    }
    process.on('exit', code => {
        if (code === -4) {
            console.log('Proceso finalizado por un argumento invalido');
        }
    })
}



listNumber(1,2,3,4, 'cinco') 