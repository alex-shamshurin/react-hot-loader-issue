import * as types from '../types';

const initialState = {
  show             : false,
  title            : '',
  text             : '',
  mode             : 'info',
  showCancelButton : false,
  onConfirmCallBack: null,
  onCancelCallBack : null,
};

const sweetAlert = (state = initialState, action) => {
  switch (action.type) {
    
    case types.SET_SWAL_SHOW:
      return {
        ...state,
        show             : true,
        title            : action.title,
        text             : action.text,
        mode             : action.mode || 'info',
        onConfirmCallBack: action.onConfirmCallBack || null,
        onCancelCallBack : action.onCancelCallBack || null,
        showCancelButton : action.showCancelButton || false,
        closeOnCancel    : action.closeOnCancel || true,
      }
    
    case types.SET_SWAL_CLOSE:
      return initialState
    
    default:
      return state;
  }
};

export default sweetAlert;
