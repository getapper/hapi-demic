// CONSTANTS
const apis = require('root/constants/apis.json')
const API = apis.retailers.methods.GET

const clientErrorsCodes = require('root/constants/errors/client-errors-codes.json')
const clientErrors = clientErrorsCodes[API]

const logErrorsCodes = require('root/constants/errors/log-errors-codes.json')
const logErrors = logErrorsCodes[API]

import internalErrors from 'root/constants/errors/internal-errors.json'

import { Params } from './GET.d'

// LIBS
import joi from 'joi'

const validate = {
  payload: joi.object().keys({
    user: joi.object().keys({
      account: joi.object().keys({
        email: joi.string().email().min(4).max(100).required()
      }).required(),
      credentials: joi.object().keys({
        password: joi.string().min(8).max(100).required()
      }).required()
    }).required(),
    retailer: joi.object().keys({
      name: joi.string().min(3).max(100).required()
    }).required()
  }).required()
}

const handler = async req => {
  const { handleResponse } = req.responseHandler
  let err
  let exists
  let params: Params = {}
  let replyData = {}
  let user
  let userData
  let retailer
  let retailerData

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


export default {
  API,
  handler,
  validate
}
