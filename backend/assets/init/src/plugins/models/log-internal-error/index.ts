export default Base => class LogInternalError extends Base {
  static get collectionName() {
    return 'adone_log_internal_errors';
  }
};
