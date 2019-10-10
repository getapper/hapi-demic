// HELPERS
import getErrors from 'root/helpers/get-errors';

// INTERFACES
import { ReplyData } from './interfaces';

// MODELS

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
