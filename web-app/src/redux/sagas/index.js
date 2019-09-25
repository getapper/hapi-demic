// REDUX
import {
  all,
} from 'redux-saga/effects'
import requestSaga from 'root-redux/sagas/ajax/request'
import feedbackSaga from 'root-redux/sagas/feedback'
import successFeedbackSaga from 'root-redux/sagas/feedback/success'
import timeoutFeedbackSaga from 'root-redux/sagas/feedback/timeout'
import {
  newRouteSuccessSaga, newMethodSuccessSaga,
} from 'root-redux/sagas/routing'


export default function* rootSaga() {
  yield all([
    requestSaga(),
    feedbackSaga(),
    successFeedbackSaga(),
    timeoutFeedbackSaga(),
    newRouteSuccessSaga(),
    newMethodSuccessSaga(),
  ])
}
