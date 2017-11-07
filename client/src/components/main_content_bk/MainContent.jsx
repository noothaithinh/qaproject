import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';


import LoginPage from './LoginPage';
import Home from './Home';

class MainContent extends React.Component {
render() {
  return (
    <div className="col-lg-6 pt10">
      <div className="content">

        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LoginPage}/>
        </Switch>

      </div>
    </div>
  );
}
}

export default MainContent;
