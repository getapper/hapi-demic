const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const PackageJson = require('../../models/json-files/package-json')
const ProxyMapJson = require('../../models/json-files/proxy-map-json')
const ConfigJson = require('../../models/json-files/config-json')
const IndexJs = require('../../models/js-files/index-js')
const Server = require('../../models/js-files/server-js')
const Gitignore = require('../../models/gitignore')
const Directories = require('../../models/directories')
const CommonJsFile = require('../../models/js-files/common-js')

process.GLOBAL.CWD = process.cwd()

module.exports = argv => {
  const packageJson = new PackageJson()
  const proxyMapJson = new ProxyMapJson()
  const configJson = new ConfigJson()
  const indexJs = new IndexJs()
  const gitignore = new Gitignore()
  const server = new Server()
  const directories = new Directories()
  const commonJsFile = new CommonJsFile()

  try {
    if (argv._.length !== 2) {
      throw new Error('Unexpected number of arguments')
    } else {
      let dirname = argv._[1]
      process.GLOBAL.PRJ_DIR = path.join(process.GLOBAL.CWD, dirname)

      // Project directory and basic files

      directories.create(dirname)

      packageJson.init({
        name: dirname
      })
      packageJson.save()

      directories.create(path.join(dirname, 'src'))
      directories.create(path.join(dirname, 'src', 'microservices'))

      indexJs.init()
      indexJs.save()

      gitignore.init()
      gitignore.save()

      server.init()
      server.save()

      // Configs

      proxyMapJson.init()
      proxyMapJson.save()

      configJson.init()
      configJson.save()

      execSync('npm i', {
        cwd: dirname,
        stdio: 'inherit'
      })

      console.log(chalk.green('DONE!'))
    }
  } catch (err) {
    console.log(chalk.red(err))
    process.exit(1)
  }
  process.exit(0)
}
