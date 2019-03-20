const JsFile = require('..')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')

class ServerJs extends JsFile {
  constructor(js) {
    super(js)
  }

  init(js) {
    const serverJsTemplate = fs.readFileSync(
      path.join(__dirname, '../../../templates/server-js-template.ejs'),
      'ascii'
    )

    this.js = ejs.render(serverJsTemplate)
  }

  read() {
    super.read('/server.js')
  }

  save() {
    super.save(path.join(process.GLOBAL.PRJ_DIR, '/src/server.js'))
  }
}

module.exports = ServerJs

