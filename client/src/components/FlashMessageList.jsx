import React from 'react';
import FlashMessage from './FlashMessage';

const styles = {
  root: {
    position: 'fixed',
    right: '0px',
    top: '0px',
    zIndex: 2900
  }
}
class FlashMessageList extends React.Component {
  render() {
    const messages = this.props.messages.map(message => <FlashMessage key={message.id} message={message}/>)
    return (
      <div style={styles.root}>
        {messages}
      </div>
    );
  }
}

export default FlashMessageList;
