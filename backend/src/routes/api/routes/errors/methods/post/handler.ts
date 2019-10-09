// HELPERS
import getErrors from 'root/helpers/get-errors';
import routesPaths from 'root/constants/route-paths.json';

// INTERFACES
import { ReplyData } from './interfaces';

// MODELS
import Routing from 'root/models/routing';
import { ApplicationError, ClientError } from 'root/models/errors';
import { exec } from 'child_process';

const handlersPaths = () => {
  const handlersPaths = [];
  // @ts-ignore
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

export default (API: string) => async req => {
  const { handleResponse } = req.responseHandler;
  const {
    clientErrors,
    logErrors,
    internalErrors
  } = getErrors(API);

  let err = null;
  const replyData: ReplyData = {};

  try {
    const paths = await handlersPaths();
    const regex = 'throw new ClientError.*[\\n | \\r\\n]?\.*clientErrors\\.(.*),.*[\\n | \\r\\n]?.*logErrors\\.(.*).*[\\n | \\r\\n]?.*\\).*';
    const routing: Routing = new Routing();
    await routing.createErrorJsons(paths, regex);
    await exec('npm run tasks.generate-api-routes-errors');
  } catch (e) {
    err = e;
  } finally {
    return handleResponse({
      API,
      err,
      replyData,
    });
  }
};
