// CONSTANTS
const clientErrorsCodes = require("root/constants/errors/client-errors-codes.json")

// LIBS
import boom from 'boom'

const plugin = {
  async register (server, {
    cookieOptions
  }) {
    const {
      ApplicationError,
      ClientError
    } = server.models

    const handleResponse = ({
      err = null,
      API = null,
      params = {},
      replyData = {},
      statusCode = 200,
      h,
      file,
      redirect,
      token,
      op = null
    }) => {
      let isError = false
      let isInternal = false
      let errorCode
      let errorMessage
      let stack
      let resultCode
      let data

      if (err) {
        errorMessage = err.message
        if (err instanceof ClientError) {
          isError = true
          errorCode = err.logErrorCode
          resultCode = err.clientErrorCode
          data = replyData
        } else if (err instanceof ApplicationError) {
          isError = true
          isInternal = true
          errorCode = err.applicationErrorCode
          resultCode = clientErrorsCodes.INTERNAL
          stack = err.stack
        } else {
          isError = true
          isInternal = true
          errorCode = -1
          resultCode = clientErrorsCodes.INTERNAL
          stack = err.stack
        }
      } else {
        resultCode = 0
        data = replyData
      }

      console.log({ API, isError, isInternal, errorCode, errorMessage, params, stack })

      if (h && file) {
        return h.file(file)
      } else if (h && redirect) {
        return h.redirect(redirect)
      } else if (statusCode !== 200) {
        return h.response(data).code(statusCode)
      } else if (h && token && resultCode === 0) {
        return h
          .response({
            resultCode,
            data
          })
          .header("Authorization", token)
          .state("token", token, cookieOptions)
      } else if (h && resultCode === 0 && op === 'logout') {
        return h
          .response({
            resultCode,
            data
          })
          .unstate("token", cookieOptions)
      } else {
        return {
          resultCode,
          data,
          stack: isInternal ? stack : undefined
        }
      }
    }

    const expose = {
      handleResponse
    }

    server.decorate('server', 'responseHandler', expose)
    server.decorate('request', 'responseHandler', expose)
  },
  name: 'hapi-response-handler',
  version: '0.0.0'
}

export default {
  plugin
}
