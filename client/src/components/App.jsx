import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Grid, Paper, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import FlashMessageList from './FlashMessageList';

import { saveToken } from 'actions/tokenManagement';






const TestLogedIn = () => {
  return <Paper>This page required login...!</Paper>
}



const styles = theme => ({
  appBar: {
    background: 'linear-gradient(13deg, #1f0069 30%, #ff8e53 90%)',
  },
  gridContainer: {
    height: '1500px',
  },
  gridContainerBackground: {
    extend: 'gridContainer',
    marginTop: '64px',
  },
  paper: {
    width: '100%',
    height: '100%',
    background: "rgba(255, 255, 255, 0.4)"
  }
})

class App extends React.Component {
  logOut = (e) => {
    console.log("=== Logout ====");
    this.props.saveToken(false);
  }
  render() {
    const { classes, messages, isAuthenticated } = this.props;

    const LoginButtons = ()=> {
      if (isAuthenticated) {
        return <Button onClick={this.logOut} to="logout">Log out</Button>
      } else {
        return (
          <div>
            <Button component={Link} to="login">Login</Button>
            <Button component={Link} to="signup">Signup</Button>
          </div>
        );
      }
    }

    const RequiredLogin = ({component: Component, ...rest}) => <Route {...rest} render={ props => isAuthenticated ? <Component {...props}/> : <LoginPage/> } />

    return (
      <Router>
        <div>
          <FlashMessageList messages={messages}/>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <Typography type="title" color="inherit">ATV</Typography>
            </Toolbar>
          </AppBar>

          <Grid container className={classes.gridContainerBackground} spacing={0}>
            <Grid item xs={10} style={{padding: '24px'}}>
              <Grid container className={classes.gridContainer} spacing={24} justify="center">
                <Grid item xs={3}>
                  <Paper className={classes.paper}></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/signup' component={SignupPage}/>
                    <RequiredLogin path='/test' component={TestLogedIn}/>
                  </Switch>
                </Grid>
                <Grid item xs={3}>
                  <Paper className={classes.paper}></Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <div>
                  <LoginButtons/>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  saveToken: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    messages: state.flashMessages,
    isAuthenticated: state.user.isAuthenticated
  }
}
export default compose(
  withStyles(styles),
  connect(mapStateToProps, { saveToken })
)(App);
