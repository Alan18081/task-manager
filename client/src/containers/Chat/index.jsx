import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import { fetchChatRoom, leaveChat, sendMessage } from "../../store/actions";

import MessageAdd from "../../components/MessageAdd";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

import { getOtherUser } from "../../selectors";

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
    const { onSendMessage, currentUser, room } = this.props;
    onSendMessage({
      message: {
        author: currentUser.get("_id"),
        text,
        createdAt: new Date()
      },
      roomId: room.get("_id")
    });
  }

  renderMessages() {
    return this.props.room
      .get("messages")
      .map(message => <Message key={message.get("_id")} message={message} />);
  }

  render() {
    const { room, otherUser, classes } = this.props;
    if (!room || !otherUser) {
      return <Loader />;
    }
    return (
      <div className={classes.container}>
        <div className={classes.messages}>{this.renderMessages()}</div>
        <div className={classes.form}>
          <MessageAdd
            submitHandler={this.sendMessageHandler}
            label="Your message"
          />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {};

const mapStateToProps = state => ({
  room: state.chat.get("room"),
  currentUser: state.user.get("profile"),
  otherUser: getOtherUser(state)
});

const mapDispatchToProps = dispatch => ({
  onFetchChatRoom: userId => dispatch(fetchChatRoom(userId)),
  onSendMessage: message => dispatch(sendMessage(message)),
  onLeaveChat: id => dispatch(leaveChat(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Chat));
