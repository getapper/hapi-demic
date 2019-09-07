// LIBS
import axios from 'axios'
import _ from 'lodash'

// REDUX
import {
  fork, take, takeEvery, put,
} from 'redux-saga/effects'
import codes from 'root-constants/client-errors-codes'
import {
  authenticationExpired,
} from '../../actions/auth'
import {
  updateAjaxLoading,
} from '../../actions/global'

function* ajaxTask(action, cancelToken) {
  const {
    type,
    url,
    method,
    data,
    query,
    uid = 1,
    options = {
      showFeedbackOnError: true,
    },
  } = action
  const api = type.replace('_AJAX_REQUEST', '')

  try {
    yield put(updateAjaxLoading(api, true, uid))
    const response = yield axios({
      url,
      method,
      data,
      params: query,
      withCredentials: true,
      cancelToken: cancelToken.token,
    })
    const resultCode = _.get(response, 'data.resultCode', '1').toString()
    const responseData = _.get(response, 'data.data', null)

    if (resultCode === '0') {
      yield put({
        type: `${api}_AJAX_SUCCESS`,
        data: responseData,
        requestData: data,
        requestQueries: query,
        uid,
        options: action.options,
      })
    } else {
      yield put({
        type: `${api}_AJAX_FAILED`,
        errorCode: resultCode,
        data: responseData,
        requestData: data,
        uid,
        status: _.get(response, 'status', 200),
        showFeedbackOnError: options.showFeedbackOnError,
      })
    }
  } catch (err) {
    if (!axios.isCancel(err)) {
      if (_.get(err, 'response.status', 200) === 401) {
        yield put(authenticationExpired())
      }
      yield put({
        type: `${api}_AJAX_FAILED`,
        errorCode: codes.INTERNAL,
        uid,
        status: _.get(err, 'response.status', 200),
        showFeedbackOnError: options.showFeedbackOnError,
      })
    }
  } finally {
    yield put(updateAjaxLoading(api, false, uid))
  }
}

function* request(action) {
  const {
    uid = 1,
    type,
  } = action
  const api = type.replace('_AJAX_REQUEST', '')
  const cancelToken = axios.CancelToken.source()
  const task = yield fork(ajaxTask, action, cancelToken)
  let exit = false

  while (!exit) {
    const resultAction = yield take([
      `${api}_AJAX_SUCCESS`,
      `${api}_AJAX_FAILED`,
      `${api}_AJAX_CANCEL`,
    ])
    const uid2 = _.get(resultAction, 'uid', 1)

    if (uid === uid2) {
      if (
        resultAction.type === `${api}_AJAX_CANCEL`
        && task
        && task.isRunning()
      ) {
        cancelToken.cancel('Canceled')
      }
      exit = true
    }
  }
}

function* requestSaga() {
  yield takeEvery(action => /^(.*?)_AJAX_REQUEST/.test(action.type), request)
}

export default requestSaga
