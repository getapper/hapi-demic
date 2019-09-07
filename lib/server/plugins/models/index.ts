// MODELS
import { ApplicationError, ClientError } from './errors'

const plugin = {
  async register (server) {
    const expose = {
      ClientError,
      ApplicationError
    }

    server.decorate('server', 'models', expose)
    server.decorate('request', 'models', expose)
  },
  name: 'hapi-models',
  version: '0.0.0'
}

export default {
  plugin
}
