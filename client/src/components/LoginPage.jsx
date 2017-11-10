import React from 'react'
import PropTypes from 'prop-types';
import { Paper, TextField, Button, Typography } from 'material-ui'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import validateFormInput from 'helpers/validations/loginForm'
import { userLoginRequest } from 'actions/apiRequest';

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {},
    inProcess: false
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {errors, isValid} = validateFormInput(this.state);
    this.setState({errors});

    if (isValid) {
      this.setState({inProcess: true});
      this.props.userLoginRequest(this.state).then(
        (res) => {
          this.setState({inProcess: false});
          this.context.router.history.push("/")
        },
        (err) => {
          this.setState({inProcess: false});
          console.log("LoginPage error ==========>>>", err)
        }
      );
    }

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {

    if (this.props.isAuthenticated){
      return <Redirect to='/' />;
    }

    return (
      <Paper style={{padding: "16px"}}>
        <Typography type="title" color="inherit">Login page</Typography>
        <form autoComplete="off" onSubmit={this.onSubmit}>
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
          <Button disabled={this.state.inProcess} color="primary" type="submit" >Login</Button>
        </form>

      </Paper>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
}

LoginPage.propTypes = {
  userLoginRequest: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state={}){
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}
export default connect(mapStateToProps, { userLoginRequest })(LoginPage);
