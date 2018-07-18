import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchChatRoom,sendMessage} from '../../store/actions';

import MessageAdd from '../../components/MessageAdd';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

class Chat extends Component {

  componentDidMount() {
    const {userId} = this.props.match.params;
    this.props.onFetchChatRoom(userId);
  }

  renderMessages() {
    this.props.room.get('messages').map(message => (
      <Message key={message.get('id')} message={message}/>
    ));
  }

  sendMessageHandler({text}) {
    this.props.onSendMessage(text);
  }

  render() {
    const {room,user} = this.props;
    if(!room || !user) {
      return <Loader/>;
    }
    return (
      <div>
        {this.renderMessages()}
        <MessageAdd
          submitHandler={this.sendMessageHandler}
          label="Your message"
        />
      </div>
    );
  }
}

Chat.propTypes = {};

const mapStateToProps = ({chat}) => ({
  room: chat.get('room'),
  user: chat.get('otherUser')
});

const mapDispatchToProps = dispatch => ({
  onFetchChatRoom: userId => dispatch(fetchChatRoom(userId)),
  onSendMessage: text => dispatch(sendMessage(text))
});

export default connect(mapStateToProps,mapDispatchToProps)(Chat);
