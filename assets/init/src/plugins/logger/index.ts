// LIBS
import moment from 'moment';

// CONSTANTS
import internalErrors from 'root/constants/errors/internal-errors.json';
import logErrors from 'root/constants/errors/log-errors.json';

// HELPERS
import LOG from 'root/helpers/log';

const plugin = {
  async register (server) {
    const {
      Log,
      LogError,
      LogInternalError
    } = server.models;

    const addLog = async ({
      API,
      isError,
      isInternal,
      errorCode,
      errorMessage,
      params,
      stack
    }) => {
      const date = moment().format('HH:mm:ss.SSS');
      const result = isError
        ? isInternal ? 'INTERNAL ERROR' : 'CLIENT ERROR'
        : 'OK';
      const message = errorCode
        ? isInternal
          ? `| ${errorCode}: ${internalErrors[errorCode]}, ${errorMessage}`
          : `| ${errorCode}: ${logErrors[errorCode]}, ${errorMessage}`
        : errorMessage
          ? `| ${errorMessage}`
          : '';
      const text = `${date} | ${API} | ${result}${message} | ${JSON.stringify(
        params
      )}`;
      LOG(text, 4);

      if (isInternal) {
        LOG(stack, 1);
      }

      if (isError) {
        if (isInternal) {
          const logErrorInternal = new LogInternalError({
            API,
            type: errorCode,
            message: errorMessage,
            stack,
            params
          });
          await logErrorInternal.save();
        } else {
          const logError = new LogError({
            API,
            type: errorCode,
            message: errorMessage,
            stack,
            params
          });
          await logError.save();
        }
      } else {
        const log = new Log({
          API,
          params
        });
        await log.save();
      }
    };

    const expose = { addLog };

    server.decorate('server', 'logger', expose);
    server.decorate('request', 'logger', expose);
  },
  name: 'hapi-logger',
  version: '3.0.0'
};

export default {
  plugin
};
