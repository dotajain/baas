import { actionTypes as types } from '../constants';

export const transferMoney = ({data}) => (dispatch) => {
  dispatch({ type: types.TRANSFER_MONEY, data });
}


export const backToFundTransfer = () => (dispatch) => {
  dispatch({ type: types.BACK_FUND_TRANFER });
}

export const thankYouTransfer = ({data}) => (dispatch) => {
  dispatch({ type: types.THANK_YOU_TRANSFER,  data });
}
