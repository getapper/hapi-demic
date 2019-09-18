// HAPIimport glue from '@hapi/glue';import pluginsMaker from './manifest';import routes from '../routes';// HELPERSimport LOG from 'root/helpers/log';// LIBSimport fs from 'fs';import chalk from 'chalk';import path from 'path';import qs from 'qs';const build = async opts => {  process.env.SERVER_ENV = process.env.SERVER_ENV || 'TEST';  const {    auth,    port,    host,    isSsl  } = opts;  let tls;  /* $lab:coverage:off$ */  if (isSsl) {    tls = {      key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),      cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'))    };  }  /* $lab:coverage:on$ */  const server = await glue.compose({    server: {      port,      host,      tls,      query: {        parser: query => qs.parse(query)      }    },    register: {      plugins: pluginsMaker(opts)    }  }, {    relativeTo: path.join(__dirname, '..', 'views')  });  // INERT DEFAULT VIEW PATH  server.route({    method: 'GET',    path: '/{param*}',    handler: {      directory: {        path: '.',        redirectToSlash: true,        index: true,      }    }  });  if (auth.enabled) {    server.auth.strategy('jwt', 'jwt', {      key: auth.jwtSecret,      validate: server.authManager.validate,      verifyOptions: { algorithms: ['HS256'] }    });  }  // App API  server.route(routes());  return server;};/* $lab:coverage:off$ */const start = async () => {  try {    process.env.DEBUG_VERBOSITY = process.env.DEBUG_VERBOSITY || '5';    process.env.SERVER_ENV = process.env.SERVER_ENV || 'LOCALE';    const opts = require(`root/configs/${process.env.SERVER_ENV}`);    Object.assign(process.env, opts.env);    const server = await build(opts);    await server.start({});    LOG(      chalk.green.bold(        `Server running at: ${          server.info.uri        } in ${process.env.SERVER_ENV} mode`      ),      0    );  } catch (e) {    LOG(chalk.yellow(e.stack), 0);    LOG(chalk.red.bold(`ERROR: ${e.message}`), 0);    e.managed = true;    throw e;  }};/* $lab:coverage:on$ */export {  start,  build};export default start;