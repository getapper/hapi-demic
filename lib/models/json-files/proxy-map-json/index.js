const JsonFile = require('..')
const path = require('path')

class PackageJson extends JsonFile {
  constructor(json) {
    super(json)
  }

  init(json) {
    this.json = Object.assign({}, {

    }, json)
  }

  read() {
    super.read('/src/proxy-map.json')
  }

  save() {
    super.save(path.join(process.GLOBAL.PRJ_DIR, '/src/proxy-map.json'))
  }
}

module.exports = PackageJson
