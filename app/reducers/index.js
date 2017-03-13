import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import lang from './langReducer'
import sweetAlert from './sweetAlertReducer'

const rootReducer = combineReducers({
  routing,
  lang,
  sweetAlert,
})

export default rootReducer
