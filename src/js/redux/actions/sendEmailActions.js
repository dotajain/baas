import { actionTypes as types } from '../constants';
import { post } from '../helpers';

export const sendEmail = ({data, serviceUrl}) => (dispatch) => {
  dispatch({ type: types.SEND_EMAIL_REQUEST });
  console.log(data);
  post({
    url: serviceUrl,
    body: data,
    success: types.SEND_EMAIL_SUCCESS,
    dispatch
  })
};

export const dismissError = () => (dispatch) => {
  const data = '';
  dispatch({ type: types.SERVICE_ERROR, data });
}
