module.exports = () => {
  const argv = require('minimist')(process.argv.slice(2));
  const chalk = require('chalk')

  switch(argv._[0]) {
    case 'init':
      require('./commands/init')(argv)
      break
    case 'help':
      require('./commands/help')()
      break
    default:
      console.log(chalk.red('Command not found'))
      require('./commands/help')()
  }
}
