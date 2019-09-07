/* eslint-disable */
// REDUX
import {
  all, put, takeEvery, delay,
} from 'redux-saga/effects'
import {
  SHOW_FEEDBACK
} from '../../action-types'
import {
  closeFeedback,
} from '../../actions'

export function* timeout() {
    yield takeEvery(SHOW_FEEDBACK,function * () {
      yield delay(2000)
      yield put(closeFeedback())
    })
}


export default function* rootSaga() {
  yield all([
    timeout(),
  ])
}
