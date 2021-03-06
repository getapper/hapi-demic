// HELPERS
import getErrors from 'root/helpers/get-errors';

// INTERFACES
import { ReplyData } from './interfaces';

// MODELS
import Routing from 'root/models/routing';
import { ApplicationError, ClientError } from 'root/models/errors';
import { exec } from 'child_process';

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
    const routing: Routing = new Routing();
    await routing.createErrorJsons();
    await exec('npm run tasks.generate-api-routes-errors');
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
