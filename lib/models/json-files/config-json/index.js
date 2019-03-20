const JsonFile = require('..')
const path = require('path')

class ConfigJson extends JsonFile {
  constructor(json) {
    super(json)
  }

  init(json) {
    this.json = Object.assign({}, {
      "port": 3000
    }, json)
  }

  read() {
    super.read('/src/config.json')
  }

  save() {
    super.save(path.join(process.GLOBAL.PRJ_DIR, '/src/config.json'))
  }
}

module.exports = ConfigJson
