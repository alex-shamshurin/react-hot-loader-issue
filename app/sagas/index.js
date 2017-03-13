import {fork} from 'redux-saga/effects'

import routeSaga from './routeSaga'

export default function* root(dispatch) {
  yield [
    fork(routeSaga, dispatch),
  ]
}

