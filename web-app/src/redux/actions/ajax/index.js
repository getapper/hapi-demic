/* eslint-disable camelcase */
export const getApiProjectAjax = (restUri, others) => ({
  type: 'GET_API_PROJECT_AJAX_REQUEST',
  method: 'GET',
  url: `${restUri}/api/project`,
  ...others,
})

export const getApiRoutingAjax = (restUri, others) => ({
  type: 'GET_API_ROUTING_AJAX_REQUEST',
  method: 'GET',
  url: `${restUri}/api/routing`,
  ...others,
})

export const createApiRoutingAjax = (restUri, payload, others) => ({
  type: 'CREATE_API_ROUTING_AJAX_REQUEST',
  method: 'POST',
  url: `${restUri}/api/routing`,
  data: payload,
  ...others,
})

export const createApiRoutingEndpointsAjax = (restUri, payload, others) => ({
  type: 'CREATE_API_ROUTING_ENDPOINTS_AJAX_REQUEST',
  method: 'POST',
  url: `${restUri}/api/routing/endpoints`,
  data: payload,
  ...others,
})
