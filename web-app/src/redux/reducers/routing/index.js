// LIBS
import immutable from 'immutable'

// REDUX
import {
  HASH_ROUTING_INIT_ROUTING,
  HASH_ROUTING_UPDATE_ACCESS_TO_ROUTE,
  HASH_ROUTING_SWITCH_ROUTE,
  HASH_ROUTING_SET_NEXT_ROUTE,
} from 'react-redux-hash-router'
import initialState from '../../initial-states/routing'

export default (state = initialState, action) => {
  let routerName
  let newRouter

  switch (action.type) {
    case HASH_ROUTING_INIT_ROUTING:
      routerName = action.routerStatePath.split('.').pop()
      newRouter = action.router.merge(state.get(routerName))
      state = state.set(routerName, newRouter)
      return state
    case HASH_ROUTING_SET_NEXT_ROUTE:
      state = state.setIn(
        [action.routerStatePath.split('.').pop(), 'next'],
        action.routeKey
      )
      return state
    case HASH_ROUTING_SWITCH_ROUTE:
      state = state.setIn(
        [action.routerStatePath.split('.').pop(), 'active'],
        action.routeKey
      )
      state = state.setIn(
        [action.routerStatePath.split('.').pop(), 'params'],
        immutable.fromJS(action.params)
      )
      return state
    case HASH_ROUTING_UPDATE_ACCESS_TO_ROUTE:
      state = state.setIn(
        [action.routerStateName, 'routes', action.routeKey, 'accessible'],
        action.access
      )
      return state
    default:
      return state
  }
}
