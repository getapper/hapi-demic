// CONSTANTS
import clientErrorsCodes from 'root/constants/errors/client-errors-codes.json'
import logErrorsCodes from 'root/constants/errors/log-errors-codes.json'

export default (API, req, h, err) => {
  const { ClientError, handleResponse } = req.responseHandler

  return h
    .response(
      handleResponse({
        API,
        err: new ClientError(
          clientErrorsCodes[API]['VALIDATION_ERROR'],
          logErrorsCodes[API]['VALIDATION_ERROR'],
          err.message
        )
      })
    )
    .takeover()
}
