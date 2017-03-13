import * as types from '../types'

function action(type, payload = {}) {
  return { type, ...payload }
}

export const swal = {
  info: (title, text, onConfirmCallBack, showCancelButton, onCancelCallBack) => action(types.SET_SWAL_SHOW, {
    title,
    text,
    onConfirmCallBack,
    showCancelButton,
    onCancelCallBack,
    mode: 'info',
  }),
  error: (title, text, onConfirmCallBack, showCancelButton, onCancelCallBack) => action(types.SET_SWAL_SHOW, {
    title,
    text,
    onConfirmCallBack,
    showCancelButton,
    onCancelCallBack,
    mode: 'error',
  }),
  warning: (title, text, onConfirmCallBack, showCancelButton, onCancelCallBack) => action(types.SET_SWAL_SHOW, {
    title,
    text,
    onConfirmCallBack,
    showCancelButton,
    onCancelCallBack,
    mode: 'warning',
  }),
  success: (title, text, onConfirmCallBack, showCancelButton, onCancelCallBack) => action(types.SET_SWAL_SHOW, {
    title,
    text,
    onConfirmCallBack,
    showCancelButton,
    onCancelCallBack,
    mode: 'success',
  }),
  close: () => action(types.SET_SWAL_CLOSE),
}

export const login = {
  request: (login) => action(types.LOGIN.REQUEST, { login }),
  success: (login, response) => action(types.LOGIN.SUCCESS, { login, response }),
  failure: (login, error) => action(types.LOGIN.FAILURE, { login, error }),
}

