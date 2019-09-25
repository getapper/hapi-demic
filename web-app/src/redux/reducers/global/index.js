// LIBS
import immutable from 'immutable' //eslint-disable-line
import _ from 'lodash'

// REDUX
import initialState from '../../initial-states/global'
import {
  UPDATE_AJAX_LOADING,
  SHOW_FEEDBACK,
  CLOSE_FEEDBACK,
} from '../../action-types/global'
import {
  GET_API_PROJECT_AJAX_SUCCESS, GET_API_ROUTING_AJAX_SUCCESS,
} from '../../action-types/ajax'

export default (state = initialState, action) => {
  let api
  let isLoading
  let uid
  let feedback

  switch (action.type) {
    case GET_API_PROJECT_AJAX_SUCCESS:
      state = state.set('isHapiDemic', action.data.isHapiDemic)
      if (action.data.isHapiDemic) {
        state = state.set('project', immutable.fromJS(action.data.project))
      }
      return state
    case GET_API_ROUTING_AJAX_SUCCESS:
      state = state.set('apis', immutable.fromJS(action.data.apis))
      return state
    case UPDATE_AJAX_LOADING:
      ({
        api, isLoading, uid,
      } = action)
      state = state.setIn(['ajaxLoaders', `${api}_${uid}`], isLoading)
      return state
    case SHOW_FEEDBACK:
      feedback = _.get(action, 'feedback', null)
      if (feedback) {
        state = state.setIn(['feedback', 'isOpen'], true)
        state = state.setIn(['feedback', 'message'], feedback.message)
        state = state.setIn(['feedback', 'type'], feedback.type)
      }
      return state
    case CLOSE_FEEDBACK:
      state = state.setIn(['feedback', 'isOpen'], false)
      return state
    default:
      return state
  }
}
