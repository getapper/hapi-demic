// HELPERS
import getErrors from 'root/helpers/get-errors';

// INTERFACES
import { ReplyData } from './interfaces';

// LIBS
import { exec } from 'child_process';

// MODELS
import Routing from 'root/models/routing';

export default (API: string) => async req => {
  const { handleResponse } = req.responseHandler;
  const {
    clientErrors,
    logErrors,
    internalErrors
  } = getErrors(API);

  let err = null;
  const replyData: ReplyData = {
    apis: null
  };

  try {
    const routing: Routing = new Routing();
    await routing.read();
    if (!routing.apis) {
      await exec('npm run tasks.generate-api-routes-errors');
      await routing.read();
    }
    replyData.apis = routing.apis;
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
