import { actionTypes as types } from '../constants';

const initialState = {
  success: '',
  fetching: false,
  fetched: false,
  err: ''
}

const sendEmail = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_EMAIL_REQUEST:
      return {...state, fetching: true}
    case types.SEND_EMAIL_SUCCESS:
      return {
          ...state,
          fetching: false,
          fetched: true,
          success: action.data,
        }
    case types.SERVICE_ERROR:
      return {...state, fetching: false, err: action.data}
    default:
      return state
  }
}

export default sendEmail;