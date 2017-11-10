import axios from 'axios';
import { addFlashMessage } from 'actions/flashMessages';
import { saveToken } from 'actions/tokenManagement';

export function userSignupRequest(data) {
  return dispatch => {
    return axios.post("http://localhost:8080/auth", data).then(
      (res) => {
        dispatch(saveToken(res.headers));
        dispatch(addFlashMessage({
          type: 'success',
          text: 'You signed up successfully. Welcome!'
        }));
      },
      (err) => {}
    )
  };
}

export function userLoginRequest(data){
  return dispatch => {
    return axios.post("http://localhost:8080/auth/sign_in", data).then(
      (res) => {
        dispatch(saveToken(res.headers));
        dispatch(addFlashMessage({
          type: 'success',
          text: 'You signed up successfully. Welcome!'
        }));
      },
      (err) => {
        if (err.response && err.response.data && err.response.data.errors){
          err.response.data.errors.map(e => {
            addFlashMessage({
              type: 'error',
              text: e
            })
            return true;
          });
        }
      }
    );
  };
}
