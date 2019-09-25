// LIBS
const mysql = require('promise-mysql');

const plugin = {
  async register (server, options) {
    const db = await mysql.createPool({
      connectionLimit: 1000,
      ...options
    });

    const expose = { db };

    server.decorate('server', 'mysql', expose);
    server.decorate('request', 'mysql', expose);
  },
  name: 'hapi-mysql',
  version: '1.0.0'
};

export default {
  plugin
};
