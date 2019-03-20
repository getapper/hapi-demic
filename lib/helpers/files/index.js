const fs = require('fs')

module.exports = {
  create: fs.writeFileSync,
  read: fs.readFileSync,
  write: fs.appendFileSync
}
