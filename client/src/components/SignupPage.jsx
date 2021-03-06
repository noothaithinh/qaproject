import React from 'react'
import PropTypes from 'prop-types';
import { Paper, TextField, Button, Typography } from 'material-ui'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { userSignupRequest } from 'actions/apiRequest';
import { addFlashMessage } from 'actions/flashMessages';

import validateFormInput from 'helpers/validations/loginForm'

class SignupPage extends React.Component {
  state = {
    email: "",
    password: "",
    passconfirm: "",
    username: "",
    errors: {},
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const {errors, isValid} = validateFormInput(this.state);

    if (isValid) {
      this.setState({errors});

      this.props.userSignupRequest(this.state).then(
        (res) => {
          this.context.router.history.push('/login');
        }
      );

    }

    return isValid;

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("onChange: ", e.target.name, " value: ", e.target.value);
  }

  render() {

    if (this.props.isAuthenticated){
      return <Redirect to='/' />;
    }

    return (
      <Paper style={{padding: "16px"}}>
        <Typography type="title" color="inherit">Sign up page</Typography>
        <form autoComplete="off" onSubmit={this.onSubmit}>
          <TextField
            error={typeof this.state.errors.username !== 'undefined'}
            name="username"
            label="Username"
            helperText={this.state.errors.username}
            placeholder="Enter Username"
            margin="normal"
            fullWidth
            onChange={this.onChange}
          />
          <TextField
            error={typeof this.state.errors.email !== 'undefined'}
            name="email"
            label="Email"
            helperText={this.state.errors.email}
            placeholder="Enter email"
            margin="normal"
            fullWidth
            onChange={this.onChange}
          />
          <TextField
            error={typeof this.state.errors.password !== 'undefined'}
            type="password"
            name="password"
            label="Password"
            helperText={this.state.errors.password}
            placeholder="Enter password"
            margin="normal"
            fullWidth
            onChange={this.onChange}
          />
          <TextField
            error={typeof this.state.errors.passconfirm !== 'undefined'}
            type="password"
            name="passconfirm"
            label="Re-type password"
            helperText={this.state.errors.passconfirm}
            placeholder="Retype password"
            margin="normal"
            fullWidth
            onChange={this.onChange}
          />
          <Button color="primary" type="submit" >Sign up</Button>
        </form>
        
      </Paper>
    );
  }
}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps, { userSignupRequest, addFlashMessage })(SignupPage);
