import React from 'react'
import PropTypes from 'prop-types';
import { Paper, TextField, Button, Typography } from 'material-ui'
import validateFormInput from 'helpers/validations/loginForm'
import axios from 'axios';
import { addFlashMessage } from 'actions/flashMessages';
import { connect } from 'react-redux';

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
      axios.post("http://localhost:8080/auth/sign_in", this.state).then(
        (res) => {
          this.setState({inProcess: false});
          console.log("this is message success!", res);
          this.context.router.history.push("/")
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          })
        },
        (err) => {
          this.setState({inProcess: false});
          if (err.response && err.response.data && err.response.data.errors){
            err.response.data.errors.map(e => {
              this.props.addFlashMessage({
                type: 'error',
                text: e
              })
              return true;
            });
          }
          console.log("this is message error.......!", {err}, "xxxxxxx")
        }
      );
    }

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // checkValidate = (e) => {

  //   const {errors, isValid} = validateFormInput(this.state);
  //   if (!isValid) {
  //     this.setState({errors});
  //   }
  //   return isValid;
  // }

  render() {
    

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
  addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage })(LoginPage);
