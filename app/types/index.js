const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  const res = {};
  //eslint-disable-next-line
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`)
  return res
}

export const LOGIN              = createRequestTypes('LOGIN')
export const LOGOUT             = createRequestTypes('LOGOUT')
export const ROUTE_AUTOCOMPLETE = createRequestTypes('ROUTE_AUTOCOMPLETE')


export const SET_SWAL_SHOW = "SET_SWAL_SHOW"
export const SET_SWAL_CLOSE = "SET_SWAL_CLOSE"

export const LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

