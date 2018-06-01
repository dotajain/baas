import { actionTypes as types } from '../constants';

export const post = async ({ url, body, success, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then((response) => response);
    
    const data = await res.json();
    
    if (!res.ok) {
        dispatch({ type: types.SERVICE_ERROR, data });
    } else {
      dispatch({ type: success, data });
    }

  } catch (data) {
    dispatch({ type: types.SERVICE_ERROR, data });
  }
};


export const get = async ({ url, body, success, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'GET'
    });
    const data = await res.json();
    dispatch({ type: success, data });
  } catch (err) {
    dispatch({ type: types.SERVICE_ERROR, err });
  }
};

export const getWTTS = async ({ url, body, success, dispatch }) => {
  try {
    const res = await fetch(url, {
      method: 'GET'
    });
    const data = await res;
    dispatch({ type: success, data });
  } catch (err) {
    dispatch({ type: types.SERVICE_ERROR, err });
  }
};
