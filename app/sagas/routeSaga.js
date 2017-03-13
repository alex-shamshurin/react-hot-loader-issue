import { put, select, takeLatest } from 'redux-saga/effects'
import * as types from '../types'
import * as actions from '../actions'
import { getRoutingPath} from '../selectors'

const {swal} = actions

/**
 * Отслеживает изменения маршрута
 * @param dispatch
 * @param action
 */
export function* watchChangeLocation(dispatch, action) {
  const routerPathState = yield select(getRoutingPath)
  
  if (routerPathState === '/') {
    yield put(swal.info("Hi", "This message is from redux-saga"))
  }
}

export default function* watchRoute(dispatch) {
  yield takeLatest(types.LOCATION_CHANGE, watchChangeLocation, dispatch)
}
