/* eslint-disable */

// CONSTANTS
import labels from 'root-constants/client-errors-codes-labels'

// REDUX
import {
  put, takeEvery
} from 'redux-saga/effects'
import {
  showFeedback,
} from 'root-redux/actions/global'

function* showErrorFeedback(action) {
  if (action.status === 200 && action.showFeedbackOnError) {
    yield put(
      showFeedback({
        message: labels[action.errorCode],
        type: 'error',
      })
    )
  }
}

export default function* feedbackSaga() {
  yield takeEvery(
    action => /^(.*?)_AJAX_FAILED/.test(action.type),
    showErrorFeedback
  )
}
