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
