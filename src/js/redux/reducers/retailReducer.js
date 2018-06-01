import { actionTypes as types } from '../constants';

const initialState = {
  data: '',
  confirmTransfer: false,
  fetching: false,
  fetched: false,
  thankYou: false,
  err: ''
}

const retailReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TRANSFER_MONEY:
      return {
          ...state,
          fetching: false,
          fetched: true,
          confirmTransfer: true,
          thankYou: false,
          data: action.data,
        }
    case types.BACK_FUND_TRANFER:
      return {
          ...state,
          confirmTransfer: false,
          thankYou: false,
          data: '',
        }
     case types.THANK_YOU_TRANSFER:
      return {
          ...state,
          confirmTransfer: false,
          thankYou: true,
          data: action.data,
        }
    default:
      return state
  }
}

export default retailReducer;