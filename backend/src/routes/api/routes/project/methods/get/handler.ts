// HELPERS
import getErrors from 'root/helpers/get-errors';

// INTERFACES
import { ReplyData } from './interfaces';

// MODELS
import Project from 'root/models/project';

export default (API: string) => async req => {
  const { handleResponse } = req.responseHandler;
  const {
    clientErrors,
    logErrors,
    internalErrors
  } = getErrors(API);

  let err = null;
  const replyData: ReplyData = {
    isHapiDemic: false,
  };
  let isHapiDemic: boolean;

  try {
    const project: Project = new Project();
    await project.read();
    isHapiDemic = !!project.version;
    if (isHapiDemic) {
      replyData.project = project;
    }
    replyData.isHapiDemic = isHapiDemic;
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
