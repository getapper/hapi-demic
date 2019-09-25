#!/usr/bin/env node
require('module-alias/register')
require('source-map-support').install();

require('./src/server')
  .start()
  .catch(err => {
    if (!err.managed) {
      console.log(err)
    }
    process.exit(-1)
  })
