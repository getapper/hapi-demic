import * as ajaxTypes from 'root-redux/action-types/ajax'

export const createApiErrorsAjax = (restUri, payload, others) => ({
  type: ajaxTypes.CREATE_API_ERRORS_AJAX_REQUEST,
  method: 'POST',
  url: `${restUri}/api/errors`,
  data: payload,
  ...others,
})

export const getApiProjectAjax = (restUri, others) => ({
  type: ajaxTypes.GET_API_PROJECT_AJAX_REQUEST,
  method: 'GET',
  url: `${restUri}/api/project`,
  ...others,
})

export const getApiProjectAjaxCancel = () => ({
  type: ajaxTypes.GET_API_PROJECT_AJAX_CANCEL,
})

export const getApiProjectAjaxDelayed = (restUri, others, timeout) => ({
  type: ajaxTypes.GET_API_PROJECT_AJAX_DELAYED,
  ajax: getApiProjectAjax,
  ajaxCancel: getApiProjectAjaxCancel,
  ajaxParams: [
    restUri, others,
  ],
  timeout,
})

export const getApiRoutingAjax = (restUri, others) => ({
  type: ajaxTypes.GET_API_ROUTING_AJAX_REQUEST,
  method: 'GET',
  url: `${restUri}/api/routing`,
  ...others,
})

export const getApiRoutingAjaxCancel = () => ({
  type: ajaxTypes.GET_API_ROUTING_AJAX_CANCEL,
})

export const getApiRoutingAjaxDelayed = (restUri, others, timeout) => ({
  type: ajaxTypes.GET_API_ROUTING_AJAX_DELAYED,
  ajax: getApiRoutingAjax,
  ajaxCancel: getApiRoutingAjaxCancel,
  ajaxParams: [
    restUri, others,
  ],
  timeout,
})

export const createApiRoutingAjax = (restUri, payload, others) => ({
  type: ajaxTypes.CREATE_API_ROUTING_AJAX_REQUEST,
  method: 'POST',
  url: `${restUri}/api/routing`,
  data: payload,
  ...others,
})

export const createApiRoutingEndpointsAjax = (restUri, payload, others) => ({
  type: ajaxTypes.CREATE_API_ROUTING_ENDPOINTS_AJAX_REQUEST,
  method: 'POST',
  url: `${restUri}/api/routing/endpoints`,
  data: payload,
  ...others,
})
