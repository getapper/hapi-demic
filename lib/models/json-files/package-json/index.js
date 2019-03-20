const JsonFile = require('..')
const path = require('path')

class PackageJson extends JsonFile {
  constructor(json) {
    super(json)
  }

  init(json) {
    this.json = Object.assign({}, {
      "version": "0.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "dev": "cross-env REST_ENV=LOCALE cross-env PORT=3620 cross-env node scripts/start.js"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "chalk": "2.4.1",
        "hapi": "17.8.5",
        "h2o2": "8.1.2",
        "path-to-regexp": "2.4.0"
      },
      "devDependencies": {
      }
    }, json)
  }

  read() {
    super.read('/package.json')
  }

  save() {
    super.save(path.join(process.GLOBAL.PRJ_DIR, '/package.json'))
  }
}

module.exports = PackageJson
