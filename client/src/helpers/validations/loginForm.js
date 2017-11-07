import { isEmpty } from 'lodash';
import Validator from 'validator';

export default (data) => {
  let errors = {};

  if (typeof data.username !== 'undefined' && Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }

  if (typeof data.password !== 'undefined' && Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }

  if (typeof data.email !== 'undefined' && Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }

  if (typeof data.passconfirm !== 'undefined') {
    if(Validator.isEmpty(data.passconfirm)){
      errors.passconfirm = 'This field is required';
    }
    else if(data.passconfirm!==data.password){
      errors.passconfirm = 'The retyped password is not the same';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
