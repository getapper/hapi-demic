const METHODS_WITH_PAYLOAD = ['post', 'put']

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

export const generateHandler = (method) => `// HELPERS
import getErrors from 'root/helpers/get-errors';

// INTERFACES
import {${(METHODS_WITH_PAYLOAD.includes(method)) ? ' Payload,':''} Params, Query, ReplyData } from './interfaces';

// MODELS

export default (API: string) => async req => {
  const { handleResponse } = req.responseHandler;
  const {
    clientErrors,
    logErrors,
    internalErrors,
  } = getErrors(API);

  let err = null;
  const replyData: ReplyData = {};${(METHODS_WITH_PAYLOAD.includes(method))? '\n  const payload: Payload = req.payload;': ''}
  const params: Params = req.params;
  const query: Query = req.query;

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

export const generateValidate = (method, params) => `import joi from '@hapi/joi';

export default {${(METHODS_WITH_PAYLOAD.includes(method)) ? '\n  payload: joi.object({}),' : ''}${(params.length) ? `\n  params: joi.object({${params.map(param => `\n    ${param}: joi.any(),`)}\n  }),` : ''}\n  query: joi.object({}),
};
`;

export const generateInterfaces = (method) => `export interface ReplyData {};${(METHODS_WITH_PAYLOAD.includes(method)) ? '\nexport interface Payload {};' : ''}\nexport interface Params {};\nexport interface Query {};
`;
