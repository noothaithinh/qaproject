import axios from 'axios';

export default function userSignupRequest(data) {
  return dispatch => {
    return axios.post("http://localhost:8080/auth", data);
  };
}
