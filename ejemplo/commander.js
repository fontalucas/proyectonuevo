const {Command} = require('commander')

const program = new Command()

program
        .option('-d', 'Variable para debug', false) //valor por defecto
        .option('-p, --port <port>', 'Puerto para el servidor', 8080)
        .option('-node <node>', 'Modo de trabajo', 'production')
        .requiredOption('-u <user>', 'Usuario utilizando el aplicativo', 'No se ha declarado un usuario')
        .option('-l, --letters [letters...]', 'specify the letters')

program.parse()

console.log('options', program.opts())   
console.log('Remaining Arguments', program.args()

)   