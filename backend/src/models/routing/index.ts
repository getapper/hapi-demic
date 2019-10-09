// HELPERS
import { listDirectory } from 'root/helpers/fs';

// LIBS
import fs from 'fs';
import util from 'util';

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
import path from "path";
import {exec} from "child_process";

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

export default class Routing {
  apis: any

  static get apiPath() {
    return `${process.cwd()}/src/constants/apis.json`;
  }

  static get routesPath() {
    return `${process.cwd()}/src/routes/`;
  }

  async read() {
    const readFile = util.promisify(fs.readFile);
    let buffer: Buffer = null;
    try {
      buffer = await readFile(Routing.apiPath);
    } catch (e) {}
    this.apis = !!buffer ? JSON.parse(buffer.toString()) : null;
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
      await writeFile(`${path}/handler.ts`, generateHandler());
      await writeFile(`${path}/interfaces.ts`, generateInterfaces());
      await writeFile(`${path}/validate.ts`, generateValidate());
      await writeFile(`${rootMethodsPath}/index.ts`, generateMethodsIndex(await listDirectory(rootMethodsPath)));
      return;
    }
    throw new ClientError(
      clientErrors.METHOD_ALREADY_EXISTS,
      logErrors.METHOD_ALREADY_EXISTS,
    );
  }

  async addRoute(routeTree: string[], route: string, clientErrors, logErrors) {
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

  async createErrorJsons(pathsJson, regex) {
    const errors = [];

    for (let pathJson of pathsJson) {
      errors.push (...await getDirErrors(Routing.routesPath+pathJson.path, regex, pathJson.key));
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
      clientErrors[e.key].push(e.clientError);
      logErrors[e.key].push(e.logError);
    });
    fs.writeFileSync(path.join(Routing.routesPath,'../constants/errors/', 'client-errors.json'), JSON.stringify(clientErrors,null,2));
    fs.writeFileSync(path.join(Routing.routesPath,'../constants/errors/', 'log-errors.json'), JSON.stringify(logErrors,null,2));
  }
}
