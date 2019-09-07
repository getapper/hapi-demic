// HELPERS
import failAction from 'root/helpers/fail-action'

// METHODS
import GET from './methods/GET'

export default () => [
  // Create retailer account
  {
    method: 'GET',
    path: '/retailers',
    config: {
      validate: {
        failAction: failAction.bind(this, GET.API)
      },
      handler: GET.handler
    }
  }
]
