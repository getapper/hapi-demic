const fs = require('fs')
const chalk = require('chalk')

module.exports = {
  create: (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    } else {
      throw 'Directory already exists'
    }
  }
}
