#!/usr/bin/env node
require('module-alias/register')

import server from './lib/server'

server()
  .then()
  .catch(console.log)
