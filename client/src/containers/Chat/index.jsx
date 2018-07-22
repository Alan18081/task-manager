import React, { Component } from "react";
import FlipMove from "react-flip-move";
import { connect } from "react-redux";
import { withStyles, List } from "@material-ui/core";
import { fetchChatRoom, leaveChat, sendChatMessage, removeMessage, getActiveMessage } from "../../store/actions";

import MessageAdd from "../../components/MessageAdd";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import MessageEdit from "../../containers/MessageEdit";

import { getOtherUser, getMessagesByChatId } from "../../selectors";

import styles from "./styles";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.sendMessageHandler = this.sendMessageHandler.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.onFetchChatRoom(userId);
  }

  componentWillUnmount() {
    const { onLeaveChat, room } = this.props;
    onLeaveChat(room.get("_id"));
  }

  sendMessageHandler({ text }) {
    const { onSendChatMessage, currentUser, room } = this.props;
    onSendChatMessage({
      message: {
        author: currentUser.get("_id"),
        text,
        createdAt: new Date()
      },
      roomId: room.get("_id")
    });
  }

  renderMessages() {
    const {messages,currentUser, onRemoveMessage, onGetActiveMessage} = this.props;
    const userId = currentUser.get("_id");
    return messages.reverse().map(message => (
      <Message
        key={message.get("_id")}
        message={message}
        remove={() => onRemoveMessage(message.get("_id"))}
        editable={userId === message.get("author").get("_id")}
        edit={() => onGetActiveMessage(message.get("_id"))}
      />
    ));
  }

  render() {
    const { room, otherUser, classes } = this.props;
    if (!room || !otherUser) {
      return <Loader />;
    }
    return (
      <div className={classes.container}>
        <MessageEdit/>
        <MessageAdd
          submitHandler={this.sendMessageHandler}
          label="Your message"
        />
          <FlipMove typeName="ul" className={classes.messages}>
            {this.renderMessages()}
          </FlipMove>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  room: state.chat.get("room"),
  messages: getMessagesByChatId(state),
  currentUser: state.user.get("profile"),
  otherUser: getOtherUser(state)
});

const mapDispatchToProps = dispatch => ({
  onFetchChatRoom: userId => dispatch(fetchChatRoom(userId)),
  onSendChatMessage: message => dispatch(sendChatMessage(message)),
  onLeaveChat: id => dispatch(leaveChat(id)),
  onRemoveMessage: id => dispatch(removeMessage(id)),
  onGetActiveMessage: id => dispatch(getActiveMessage(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
