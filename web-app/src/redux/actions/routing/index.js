// REDUX
import {
  HASH_ROUTING_INIT_ROUTING,
  HASH_ROUTING_UPDATE_ACCESS_TO_ROUTE,
  HASH_ROUTING_SWITCH_ROUTE,
  HASH_ROUTING_SET_NEXT_ROUTE
} from 'react-redux-hash-router'

export const updateAccessToMainRouter = (routeKey, access) => ({
  type: HASH_ROUTING_UPDATE_ACCESS_TO_ROUTE,
  routerStateName: 'mainRouter',
  routeKey,
  access
})
