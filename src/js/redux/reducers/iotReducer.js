import { actionTypes as types } from '../constants';

const initialState = {
  success: '',
  fetching: false,
  fetched: false,
  err: '',
  all: ''
}

const getTemprature = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TEMPRATURE_REQUEST:
      return {...state, fetching: true}
    case types.GET_TEMPRATURE_SUCCESS:
      return {
          ...state,
          fetching: false,
          fetched: true,
          success: action.data,
        }
    case types.GET_ALL_TEMPRATURE_SUCCESS:
      return {
          ...state,
          all: action.data,
        }
    case types.SERVICE_ERROR:
      return {...state, fetching: false, err: action.data}
    default:
      return state
  }
}

export default getTemprature;