const { create, read, write } = require('../../helpers/files')

class JsFile {
  constructor (js) {
    if (js) {
      this.js = js
    }
  }

  read (path) {
    return read(path, 'ascii')
  }

  save (path) {
    create(path, this.js)
  }

  write (path, text) {
    write(path, text)
  }
}

module.exports = JsFile
