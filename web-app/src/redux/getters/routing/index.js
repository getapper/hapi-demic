// LIBS
import {
  createSelector,
} from 'reselect'

export const getMainRouterParams = state => state.getIn(['routing', 'mainRouter', 'params'])
