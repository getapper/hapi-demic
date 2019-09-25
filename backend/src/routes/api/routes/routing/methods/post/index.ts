// CONSTANTS
const apis = require('root/constants/apis.json');
const API = apis.api.routes.routing.methods.POST;

// HELPERS
import failAction from 'root/helpers/fail-action';

// PARAMS
import handler from './handler';
import validate from './validate';

export default () => ({
  method: 'POST',
  path: '/api/routing',
  config: {
    tags: ['api'],
    validate: {
      failAction: failAction.bind(this, API),
      ...validate
    },
    handler: handler(API)
  }
});
