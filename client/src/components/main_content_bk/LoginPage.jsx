import React, { PropTypes } from 'react'

import validateFormInput from 'helpers/validations/loginForm'
class LoginPage extends React.Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
      errors: {},
      isLoading: false
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      // TODO: call login to server
      console.log("this called a requst to server", this.state);
    }
  }
  isValid(){
    const {errors, isValid} = validateFormInput(this.state);
    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }
  render() {
    const { errors } = this.state;
    return (
      <form className="form" onSubmit={this.onSubmit} autoComplete="off">
        <h1>Vu Khum</h1>
        <h2 className="f25 pb20">Login</h2>
        <div className="form-group">
          <label forhtml="user">User name</label>
          <input onChange={this.onChange} value={this.state.username} name="username" type="text" className="form-control" id="user" placeholder="Enter your user name"/>
          {errors.username && <span className="help-block">{errors.username}</span>}
        </div>
        <div className="form-group">
          <label forhtml="password">Password</label>
          <input onChange={this.onChange} name="password" type="password" className="form-control" id="password" placeholder="Enter your password"/>
            {errors.password && <span className="help-block">{errors.password}</span>}
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
      </form>
    );
  }
}

export default LoginPage;
