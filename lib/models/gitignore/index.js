const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const { create } = require('../../helpers/files')

class Gitignore {
  constructor (params) {
    if (params) {
      this.params = params
    }
  }

  init(params) {
    const gitignoreTemplate = fs.readFileSync(
      path.join(__dirname, '../../templates/gitignore-template.ejs'),
      'ascii'
    )

    this.params = ejs.render(gitignoreTemplate)
  }

  read() {

  }

  save() {
    create(path.join(process.GLOBAL.PRJ_DIR, '/.gitignore'), this.params)
  }
}

module.exports = Gitignore

