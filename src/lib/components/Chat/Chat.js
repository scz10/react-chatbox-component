import React from 'react';
import MessageList from './MessageList';
import PropTypes from 'prop-types';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  //componentDidUpdate(prevProps, prevState) {
  //  if (prevState.message !== this.state.message && this.props.typingListener) {
  //    this.props.typingListener();
  //  }
  //  //this.scrollToBottom();
  //}

  componentDidMount(){
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    const chat = document.getElementById('end-of-chat');
    chat.scrollIntoView();
    window.scrollTo(0,0);
  };

  handleSendMessage = event => {
    event.preventDefault();
    const {message} = this.state;
    this.props.onSubmit(message);
    this.setState({message: ''});
  };


  render() {
    
    let {messages, isLoading, user, renderMessage} = this.props;
    let {message} = this.state;

    return (
            <div className='chat-box'>
              <div className='msg-page'>
                <MessageList
                  isLoading={isLoading}
                  messages={messages} 
                  user={user}
                  renderMessage={renderMessage}
                />
                <div className='chat-box-bottom'>
                  <div id='end-of-chat'></div>
                </div>
              </div>
              <div className='msg-footer'>
                <form
                  className='message-form'
                  onSubmit={this.handleSendMessage}>
                  <div className='input-group'>
                    <input
                      type='text'
                      className='form-control message-input'
                      maxLength='500'
                      placeholder='Type something'
                      value={message}
                      onChange={event => this.setState({ message: event.target.value})}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  renderMessage: PropTypes.func,
  typingListener: PropTypes.func,
  typingIndicator: PropTypes.element,
};

Chat.defaultProps = {
  messages: [],
  user: {
    "uid": "user1"
  },
  isLoading: false,
  onSubmit: (message) => console.log(message)
};

export default Chat;

