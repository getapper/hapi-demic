const JsFile = require('..')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

class IndexJs extends JsFile {
  constructor(js) {
    super(js)
  }

  init(js) {
    const indexJsTemplate = fs.readFileSync(
      path.join(__dirname, '../../../templates/index-js-template.ejs'),
      'ascii'
    )

    this.js = ejs.render(indexJsTemplate)
  }

  read() {
    super.read('/index.js')
  }

  save() {
    super.save(path.join(process.GLOBAL.PRJ_DIR, '/src/index.js'))
  }
}

module.exports = IndexJs

