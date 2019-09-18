require('module-alias/register');

import fs from 'fs';
import path from 'path';

const SIMBOL = '/';

const readDir = (routePaths, currentPath, currentRoute?) => {
  const apis = {};
  if (fs.existsSync(currentPath)) {
    const models = fs.readdirSync(currentPath);
    for (let i in models) {
      if (fs.lstatSync(path.join(currentPath, models[i])).isDirectory()) {
        apis[models[i]] = {};
        if (fs.existsSync(path.join(currentPath, models[i], 'methods'))) {
          const methods = fs.readdirSync(path.join(currentPath, models[i], 'methods'));
          for (let j in methods) {
            if (fs.lstatSync(path.join(currentPath, models[i], 'methods', methods[j])).isDirectory()) {
              apis[models[i]]['methods'] = apis[models[i]]['methods'] || {};
              const method = methods[j].toUpperCase();
              const arr = (currentRoute ? [currentRoute] : []).concat([models[i], method]);
              apis[models[i]]['methods'][method] = arr.join(SIMBOL);
              let parts = apis[models[i]]['methods'][method].split(SIMBOL);
              parts = parts.map(p => {
                if (p[0] === '$') {
                  p = p.substring(1);
                  let arr = p.split('-');
                  arr = arr.map(s => s.charAt(0).toUpperCase() + s.slice(1));
                  p = arr.join('');
                  p = p.charAt(0).toLowerCase() + p.slice(1);
                  p = `{${p}}`;
                }
                return p;
              });
              parts.pop();
              routePaths[apis[models[i]]['methods'][method]] = `/${parts.join('/')}`;
            }
          }
        }
        const route = currentRoute ? [currentRoute, models[i]].join(SIMBOL) : models[i];
        const subRoute = readDir(routePaths, path.join(currentPath, models[i], 'routes'), route);
        if (Object.keys(subRoute).length) {
          apis[models[i]]['routes'] = apis[models[i]]['routes'] || {};
          Object.assign(apis[models[i]]['routes'], subRoute);
        }
      }
    }
  }
  return apis;
};

export const calculate = () => {
  let routePaths = {};
  const apis = readDir(routePaths, path.join(__dirname, '..', 'routes'));
  console.log(apis, routePaths);
  fs.writeFileSync(path.join(__dirname, '..', 'constants', 'apis.json'), JSON.stringify(apis,null,2));
  fs.writeFileSync(path.join(__dirname, '..', 'constants', 'route-paths.json'), JSON.stringify(routePaths,null,2));
};

calculate();

