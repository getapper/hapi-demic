require('module-alias/register');

import apis from 'root/constants/apis.json';

import fs from 'fs';
import path from 'path';

const readRoute = (errors, prevClientErrors, errorCodes, apis, route) => {
  for (let method in apis[route]['methods']) {
    if (!prevClientErrors[apis[route]['methods'][method]]) {
      errors[apis[route]['methods'][method]] = [];
      errors[apis[route]['methods'][method]].push('VALIDATION_ERROR');
    } else {
      errors[apis[route]['methods'][method]] = prevClientErrors[apis[route]['methods'][method]];
    }
    errorCodes[apis[route]['methods'][method]] = {};
    for (let e in errors[apis[route]['methods'][method]]) {
      const error = errors[apis[route]['methods'][method]][e];
      errorCodes[apis[route]['methods'][method]][error] = `${apis[route]['methods'][method]}_${error}`;
    }
  }
  if (apis[route]['routes']) {
    for (let subRoute  in apis[route]['routes']) {
      readRoute(errors, prevClientErrors, errorCodes, apis[route]['routes'], subRoute);
    }
  }
};

export const calculate = () => {
  let clientErrors = {};
  let prevClientErrors = {};
  let clientErrorsCodes = {
    INTERNAL: 'INTERNAL'
  };
  if (fs.existsSync(path.join(__dirname, '..', 'constants', 'errors', 'client-errors.json'))) {
    prevClientErrors = require('../constants/errors/client-errors');
  }
  for (let route in apis) {
    readRoute(clientErrors, prevClientErrors, clientErrorsCodes, apis, route);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'constants', 'errors', 'client-errors.json'), JSON.stringify(clientErrors,null,2));
  fs.writeFileSync(path.join(__dirname, '..', 'constants', 'errors', 'client-errors-codes.json'), JSON.stringify(clientErrorsCodes,null,2));
  let logErrors = {};
  let prevLogErrors = {};
  let logErrorsCodes = {};
  if (fs.existsSync(path.join(__dirname, '..', 'constants', 'errors', 'log-errors.json'))) {
    prevLogErrors = require('../constants/errors/log-errors');
  }
  for (let route in apis) {
    readRoute(logErrors, prevLogErrors, logErrorsCodes, apis, route);
  }
  fs.writeFileSync(path.join(__dirname, '..', 'constants', 'errors', 'log-errors.json'), JSON.stringify(logErrors,null,2));
  fs.writeFileSync(path.join(__dirname, '..', 'constants', 'errors', 'log-errors-codes.json'), JSON.stringify(logErrorsCodes,null,2));
};

calculate();

