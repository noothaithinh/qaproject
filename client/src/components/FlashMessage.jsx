/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Fade from 'material-ui/transitions/Fade';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { removeFlashMessage } from 'actions/flashMessages';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  snackbar:{
    position: 'relative',
    marginBottom: theme.spacing.unit,
  },
  snackbarContentSuccess:{
    backgroundColor: '#4caf4f',
  },
  snackbarContentError:{
    backgroundColor: '#f44336',
  }
});

class FlashMessage extends React.Component {
  state = {
    open: true
  }
  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  onExited = () => {
    this.props.removeFlashMessage(this.props.message)
    console.log("====>>>> this is onExited callback")
  }

  render() {
    const { classes, message } = this.props;
    const snackbarContent = message.type === 'success' ? classes.snackbarContentSuccess: classes.snackbarContentError; 
    return (
      <div>
        <Snackbar
          open={this.state.open}
          onExited={this.onExited}
          transition={Fade}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className={classes.snackbar}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
          message={<span id="{message.id}">{message.text}</span>}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
            'classes': {root: snackbarContent}
          }}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleRequestClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

FlashMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  removeFlashMessage: PropTypes.func.isRequired,
};

export default compose(
  connect(null, { removeFlashMessage }),
  withStyles(styles)
)(FlashMessage);
