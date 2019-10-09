// ROUTES
import project from './project';
import routing from './routing';
import errors from './errors';

export default () => [
  ...(project()),
  ...(routing()),
  ...(errors())
];
