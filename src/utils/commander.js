const {Command} = require('commander') 

const commander = new Command()

commander
        .option('--mode <mode>', 'Modo de ejecucion de server', 'development')

commander.parse()

module.exports = {commander}