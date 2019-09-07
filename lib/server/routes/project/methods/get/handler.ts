// HELPERS
import getErrors from 'root/helpers/get-errors'

// INTERFACES
import {
  Params,
  ReplyData
} from "./interfaces";

export default (API: string) => async req => {
  const { handleResponse } = req.responseHandler
  const {
    clientErrors,
    logErrors,
    internalErrors
  } = getErrors(API)

  let err = null
  let params: Params = {}
  let replyData: ReplyData = {}

  try {

  } catch (e) {
    err = e
  } finally {
    return handleResponse({
      API,
      err,
      replyData,
      params
    })
  }
}
