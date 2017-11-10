import { SET_USER_AUTHEN } from 'actions/types';

export function setUserAuth(data){
  return {
    type: SET_USER_AUTHEN,
    isAuthenticated: data
  };
}
