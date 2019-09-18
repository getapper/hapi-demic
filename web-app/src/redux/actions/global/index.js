// REDUX
import {
  UPDATE_AJAX_LOADING,
  SHOW_FEEDBACK,
  CLOSE_FEEDBACK,
} from '../../action-types'

export const updateAjaxLoading = (api, isLoading, uid = 1) => ({
  type: UPDATE_AJAX_LOADING,
  api,
  isLoading,
  uid,
})

export const showFeedback = feedback => ({
  type: SHOW_FEEDBACK,
  feedback,
})

export const closeFeedback = () => ({
  type: CLOSE_FEEDBACK,
})
