// LIBS
import {
  createSelector,
} from 'reselect'

export const getRestUri = state => state.getIn(['global', 'restUri'])
export const getFeedback = state => state.getIn(['global', 'feedback'])
export const getIsHapiDemic = state => state.getIn(['global', 'isHapiDemic'])
export const getProject = state => state.getIn(['global', 'project'])
export const getApis = createSelector(
  state => state.getIn(['global', 'apis']),
  apis => apis ? apis.toJS() : {}
)
