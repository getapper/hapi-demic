/* eslint-disable */
// REDUX
import {
  all, put, takeEvery,
} from 'redux-saga/effects'
import {
} from '../../action-types'
import {
  showFeedback,
} from '../../actions'

export function* success() {
  yield takeEvery([], function * (action) {
    let message = ''
    switch (action.type) {
      default:
        message = 'Azione compiuta con successo'
    }

    yield put(
      showFeedback({
        message,
        type: 'success',
      })
    )
    })
}


export default function* rootSaga() {
  yield all([
    success(),
  ])
}
