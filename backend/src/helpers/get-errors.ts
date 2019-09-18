// CONSTANTS
import clientErrorsCodes from 'root/constants/errors/client-errors-codes.json';
import logErrorsCodes from 'root/constants/errors/log-errors-codes.json';
import internalErrors from 'root/constants/errors/internal-errors.json';

export default API => ({
  clientErrors: clientErrorsCodes[API],
  logErrors: logErrorsCodes[API],
  internalErrors
});
