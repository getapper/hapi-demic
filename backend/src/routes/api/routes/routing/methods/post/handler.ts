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

  const {
    route,
    path,
  } = req.payload;

  try {
    const routing: Routing = new Routing();
    await routing.read();
    if (!routing.apis) {
      throw new ClientError(
        clientErrors.ROUTING_NOT_FOUND,
        logErrors.ROUTING_NOT_FOUND,
      );
    } else {
      const routeTree: string[] = path.split('_');
      if (!routing.checkRouteTreeExists(routeTree)) {
        throw new ClientError(
          clientErrors.ROUTE_NOT_FOUND,
          logErrors.ROUTE_NOT_FOUND,
        );
      } else {
        try {
          await routing.addRoute(routeTree, route, clientErrors, logErrors);
          await exec('npm run tasks.generate-api-routes-errors');
        } catch (e) {
          if (e instanceof ClientError) {
            throw e;
          } else {
            throw new ApplicationError(
              e,
              internalErrors.FILE_SYSTEM,
            );
          }
        }
      }
    }
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
