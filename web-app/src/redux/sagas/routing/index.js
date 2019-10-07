// CONSTANTS
import labels from 'root-constants/client-errors-codes-labels'

// REDUX
import {
  put, takeEvery, delay,
} from 'redux-saga/effects'
import {
  showFeedback,
} from 'root-redux/actions/global'
import {
  CREATE_API_ROUTING_AJAX_SUCCESS, CREATE_API_ROUTING_ENDPOINTS_AJAX_SUCCESS,
} from 'root-redux/action-types'

function* newRouteSuccessSaga() {
  yield takeEvery(
    CREATE_API_ROUTING_AJAX_SUCCESS,
    function* () {
      yield put(
        showFeedback({
          message: 'Route created successfully',
          type: 'success',
        })
      )
      yield delay(1000)
      window.location.href = '#/routes'
    }
  )
}

function* newMethodSuccessSaga() {
  yield takeEvery(
    CREATE_API_ROUTING_ENDPOINTS_AJAX_SUCCESS,
    function* () {
      yield put(
        showFeedback({
          message: 'Method created successfully',
          type: 'success',
        })
      )
      yield delay(1000)
      window.location.href = '#/routes'
    }
  )
}

export {
  newRouteSuccessSaga,
  newMethodSuccessSaga,
}
