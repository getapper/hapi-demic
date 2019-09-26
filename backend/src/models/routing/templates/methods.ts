export const generateIndex = (
  methodPath: string,
  method: string,
  routePath: string,
) => `// CONSTANTS
const apis = require('root/constants/apis.json');
const routePaths = require('root/constants/route-paths.json');
const API = ${methodPath};

// HELPERS
import failAction from 'root/helpers/fail-action';

// PARAMS
import handler from './handler';
import validate from './validate';

export default () => ({
  method: '${method}',
  path: routePaths[API],
  config: {
    tags: ['api'],
    validate: {
      failAction: failAction.bind(this, API),
      ...validate
    },
    handler: handler(API)
  }
});
`;

export const generateHandler = () => `// HELPERS
import getErrors from 'root/helpers/get-errors';

// INTERFACES
import { ReplyData } from './interfaces';

// MODELS

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
`;

export const generateValidate = () => `import joi from '@hapi/joi';

export default {
};
`;

export const generateInterfaces = () => `export interface ReplyData {};
`;
