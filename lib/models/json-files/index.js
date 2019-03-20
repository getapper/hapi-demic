const { create } = require('../../helpers/files')

class JsonFile {
  constructor (json) {
    if (json) {
      this.json = json
    }
  }

  read (path) {

  }

  save (path) {
    create(path, JSON.stringify(this.json, null, "\t"))
  }
}

module.exports = JsonFile
