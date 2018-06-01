import { actionTypes as types } from '../constants';
import { get } from '../helpers';

export const getTemprature = () => (dispatch) => {
  console.log('hello');
  dispatch({ type: types.GET_TEMPRATURE_REQUEST });
  get({
    url: 'https://gettemperatureservice.cfapps.io/getLatest',
    success: types.GET_TEMPRATURE_SUCCESS,
    dispatch
  })
};

export const getAllTemprature = () => (dispatch) => {
  dispatch({ type: types.GET_ALL_TEMPRATURE_REQUEST });
  get({
    url: 'https://gettemperatureservice.cfapps.io/getAll',
    success: types.GET_ALL_TEMPRATURE_SUCCESS,
    dispatch
  })
}
