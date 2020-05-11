// HELPERS
import { listDirectory } from 'root/helpers/fs';

// LIBS
import fs from 'fs';
import util from 'util';
import path from 'path';

// MODELS
import { ClientError } from 'root/models/errors';

// TEMPLATES
import {
  generateIndex,
  generateHandler,
  generateInterfaces,
  generateValidate,
} from './templates/methods';
import {
  generateRouteIndex,
  generateMethodsIndex,
  generateRoutesIndex,
} from './templates/routes';

const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);

const getDirErrors = async (dir, filter, key) => {
  const fileContent =fs.readFileSync(dir, 'utf8');
  const regex = new RegExp(filter, 'gi') ;
  const reply = [{
    key,
    clientError: 'VALIDATION_ERROR',
    logError: 'VALIDATION_ERROR'
  }];

  const matches = fileContent.match(regex) || [];
  if(matches.length) {
    matches.forEach(m => {
      const res = m.match(filter);
      if (res) {
        reply.push({
          key,
          clientError: res[1],
          logError: res[2]
        });
      }
    });
  }
  return reply;
};

const handlersPaths = (routesPaths) => {
  const handlersPaths = [];
  Object.keys(routesPaths).map((rp) =>{
    let path = 'api';
    let i = 1;
    const route = rp.split('/');
    while (route[i]) {
      if (['POST', 'GET', 'DELETE', 'PUT'].indexOf(route[i]) !== -1) {
        path = path + '/methods/' + route[i].toLowerCase();
      } else {
        path = path + '/routes/' + route[i];
      }
      i++;
    }
    handlersPaths.push({
      key: rp,
      path: path+'/handler.ts'
    });
  });
  return handlersPaths;
};

export default class Routing {
  apis: any
  routes: any

  static get apiPath() {
    return `${process.cwd()}/src/constants/apis.json`;
  }

  static get routePathsPath() {
    return `${process.cwd()}/src/constants/route-paths.json`;
  }

  static get routesPath() {
    return `${process.cwd()}/src/routes/`;
  }

  static get errorsPath() {
    return `${process.cwd()}/src/constants/errors/`;
  }

  async read() {
    const readFile = util.promisify(fs.readFile);
    let buffer: Buffer = null;
    try {
      buffer = await readFile(Routing.apiPath);
    } catch (e) {}
    this.apis = !!buffer ? JSON.parse(buffer.toString()) : null;
  }

  async readRoutes() {
    const readFile = util.promisify(fs.readFile);
    let buffer: Buffer = null;
    try {
      buffer = await readFile(Routing.routePathsPath);
    } catch (e) {}
    this.routes = !!buffer ? JSON.parse(buffer.toString()) : null;
  }

  checkRouteTreeExists(routeTree: string[]) {
    let root = this.apis;
    routeTree.forEach(route => {
      if (typeof root[route] === 'undefined') {
        return false;
      } else {
        root = root[route].routes;
      }
    });
    return true;
  }

  async addMethod(routeTree: string[], method: string, clientErrors, logErrors) {
    const path = `${Routing.routesPath}${routeTree.join('/routes/')}/methods/${method.toLowerCase()}`;
    const rootMethodsPath = `${Routing.routesPath}${routeTree.join('/routes/')}/methods`;
    const params = routeTree.filter(element => element[0] === '$')
    try {
      await stat(path);
    } catch (e) {
      await mkdir(path);
      await writeFile(`${path}/index.ts`, generateIndex(
        `apis${routeTree
          .map(r => r.indexOf('-') !== -1 ? `['${r}']` : `.${r}`)
          .join('.routes')
        }.methods.${method.toUpperCase()}`,
        method.toUpperCase(),
        `/${routeTree.join('/')}`
      ));
      await writeFile(`${path}/handler.ts`, generateHandler(method.toLowerCase()));
      await writeFile(`${path}/interfaces.ts`, generateInterfaces(method.toLowerCase()));
      await writeFile(`${path}/validate.ts`, generateValidate(method.toLowerCase(), params));
      await writeFile(`${rootMethodsPath}/index.ts`, generateMethodsIndex(await listDirectory(rootMethodsPath)));
      return;
    }
    throw new ClientError(
      clientErrors.METHOD_ALREADY_EXISTS,
      logErrors.METHOD_ALREADY_EXISTS,
    );
  }

  async addRoute(routeTree: string[], route: string, clientErrors: any, logErrors: any) {
    const path = `${Routing.routesPath}${[...routeTree, route].join('/routes/')}`;
    const rootRoutesPath = `${Routing.routesPath}${routeTree.join('/routes/')}/routes`;
    try {
      await stat(path);
    } catch (e) {
      await mkdir(path);
      await mkdir(`${path}/methods`);
      await mkdir(`${path}/routes`);
      await writeFile(`${path}/index.ts`, generateRouteIndex());
      await writeFile(`${path}/methods/index.ts`, generateMethodsIndex([]));
      await writeFile(`${path}/routes/index.ts`, generateRoutesIndex([]));
      await writeFile(`${rootRoutesPath}/index.ts`, generateRoutesIndex(await listDirectory(rootRoutesPath)));
      return;
    }
    throw new ClientError(
      clientErrors.ROUTE_ALREADY_EXISTS,
      logErrors.ROUTE_ALREADY_EXISTS,
    );
  }

  async createErrorJsons() {
    const regex = 'throw new ClientError.*[\\n | \\r\\n]?\.*clientErrors\\.(.*),.*[\\n | \\r\\n]?.*logErrors\\.(.*).*[\\n | \\r\\n]?.*\\).*';
    await this.readRoutes();
    const pathsJson = await handlersPaths(this.routes);
    const errors = [];

    for (let pathJson of pathsJson) {
      errors.push(...await getDirErrors(Routing.routesPath+pathJson.path, regex, pathJson.key));
    }
    const clientErrors = {};
    const logErrors = {};
    errors.forEach((e) => {
      if (!clientErrors[e.key]) {
        clientErrors[e.key] = [];
      }
      if (!logErrors[e.key]) {
        logErrors[e.key] = [];
      }
      if (clientErrors[e.key].indexOf(e.clientError) === -1) {
        clientErrors[e.key].push(e.clientError);
      }
      if (logErrors[e.key].indexOf(e.logError) === -1) {
        logErrors[e.key].push(e.logError);
      }
    });
    fs.writeFileSync(path.join(Routing.errorsPath, 'client-errors.json'), JSON.stringify(clientErrors,null,2));
    fs.writeFileSync(path.join(Routing.errorsPath, 'log-errors.json'), JSON.stringify(logErrors,null,2));
  }
}
