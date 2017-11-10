import React from 'react'
import { Paper } from 'material-ui'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <Paper>
        This is HomePage
        {isAuthenticated && <h2>User loged in</h2>  }
      </Paper>
    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.user.isAuthenticated
  };
}

export default connect(mapStateToProps)(HomePage);
