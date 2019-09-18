// ROUTES
import project from './project';
import routing from './routing';

export default () => [
  ...(project()),
  ...(routing()),
];
