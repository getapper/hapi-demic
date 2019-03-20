const {create} = require('../../../helpers/files')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

class CommonJsFile {
  constructor() {

  }

  read(path) {

  }

  init(templatePath) {
    const commonJsTemplate = fs.readFileSync(
      path.join(__dirname, `../../../templates/${templatePath}`),
      'ascii'
    )

    this.js = ejs.render(commonJsTemplate)
  }

  save(filePath) {
    create(path.join(process.GLOBAL.PRJ_DIR, filePath), this.js)
  }
}

module.exports = CommonJsFile
