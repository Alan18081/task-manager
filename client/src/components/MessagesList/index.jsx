import React from "react";
import FlipMove from "react-flip-move";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

import styles from "./styles";

import Message from "../Message";

const MessagesList = ({
  messages,
  getActiveMessage,
  removeMessage,
  userId,
  classes
}) => (
  <FlipMove typeName="ul" className={classes.container}>
    {messages.map(message => (
      <Message
        key={message.get("_id")}
        message={message}
        editable={message.get("author").get("_id") === userId}
        edit={() => getActiveMessage(message.get("_id"))}
        remove={() => removeMessage(message.get("_id"))}
      />
    ))}
  </FlipMove>
);

MessagesList.propTypes = {
  messages: PropTypes.object.isRequired,
  getActiveMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default withStyles(styles)(MessagesList);
