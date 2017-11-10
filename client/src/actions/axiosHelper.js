import axios from 'axios';
import { setUserAuth } from 'actions/user';

export function updateRequestHeader(){
  return dispatch => {
    const { accessToken, client, expiry, uid } = localStorage;

    if (accessToken && client && expiry && uid) {
      axios.defaults.headers.common['access-token'] = accessToken;
      axios.defaults.headers.common['client'] = client;
      axios.defaults.headers.common['expiry'] = expiry;
      axios.defaults.headers.common['uid'] = uid;
      dispatch(setUserAuth(true));
    } else {
      delete  axios.defaults.headers.common['access-token'];
      delete axios.defaults.headers.common['client'];
      delete axios.defaults.headers.common['expiry'];
      delete axios.defaults.headers.common['uid'];
      dispatch(setUserAuth(false));
    }
  };
}

