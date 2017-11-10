import { SET_USER_AUTHEN } from 'actions/types';

export default (state = {isAuthenticated: false}, actions) => {
  switch (actions.type) {
    case SET_USER_AUTHEN: 
      return {isAuthenticated: actions.isAuthenticated};
    default:
      return state;
  }
}
