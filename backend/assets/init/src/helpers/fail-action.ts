// CONSTANTS
import clientErrorsCodes from 'root/constants/errors/client-errors-codes.json';
import logErrorsCodes from 'root/constants/errors/log-errors-codes.json';
import { ClientError } from 'root/models/errors';

export default (API, req, h, err) => {
  const { handleResponse } = req.responseHandler;

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
    .takeover();
};
