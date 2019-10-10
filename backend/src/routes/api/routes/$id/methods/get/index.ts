// CONSTANTS
const apis = require('root/constants/apis.json');
const routePaths = require('root/constants/route-paths.json');
const API = apis.api.routes.$id.methods.GET;

// HELPERS
import failAction from 'root/helpers/fail-action';

// PARAMS
import handler from './handler';
import validate from './validate';

export default () => ({
  method: 'GET',
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
