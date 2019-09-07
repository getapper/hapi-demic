export default class ClientError extends Error {
  clientErrorCode: number
  logErrorCode: number

  constructor (clientErrorCode, logErrorCode, message = '') {
    super(message)
    this.name = 'ClientError'
    this.clientErrorCode = clientErrorCode
    this.logErrorCode = logErrorCode
  }
}
