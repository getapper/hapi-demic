// LIBS
import immutable from 'immutable'

// SERVICES
import {
  getRestUri,
} from 'root-services/env'

export default immutable.fromJS({
  ajaxLoaders: {},
  restUri: getRestUri(),
  feedback: {
    isOpen: false,
    message: null,
    type: null,
  },
  isHapiDemic: null,
  project: null,
  apis: null,
})
