// HELPERS
import noop from 'root/helpers/noop';

export default (...args) => {
  const lastArg = args.slice(-1)[0];
  let debugValue = 5;
  if (typeof lastArg === 'number') {
    debugValue = lastArg;
    args.pop();
  }
  if (debugValue <= parseInt(process.env.DEBUG_VERBOSITY, 10)) {
    for (let a in args) {
      // eslint-disable-next-line
      console.log(args[a])
    }
  }
};
