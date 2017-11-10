import { updateRequestHeader } from './axiosHelper';

export function saveToken(headers){
  return dispatch => {
    if (headers) {
      localStorage.setItem('accessToken', headers['access-token']);
      localStorage.setItem('client', headers['client']);
      localStorage.setItem('expiry', headers['expiry']);
      localStorage.setItem('uid', headers['uid']);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('client');
      localStorage.removeItem('expiry');
      localStorage.removeItem('uid');
    }
    dispatch(updateRequestHeader());
  }
}
