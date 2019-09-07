export default class ApplicationError extends Error {
  applicationErrorCode: number

  constructor (err, applicationErrorCode) {
    super(err.message)
    this.name = 'ApplicationError'
    this.applicationErrorCode = applicationErrorCode
  }
}
