import React from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  Divider
} from "@material-ui/core";
import PropTypes from "prop-types";

import Message from "../../components/Message/index";
import MessageAdd from "../../components/MessageAdd/index";
import MessageEdit from "../../components/MessageEdit";

const Comments = ({ userId, messages, sendHandler, getActiveMessage }) => (
  <Card>
    <CardContent>
      <MessageEdit/>
      <Typography variant="headline">Comments</Typography>
      <List>
        {messages.map(message => (
          <Message
            key={message.get("_id")}
            message={message}
            editable={message.get("_id") === userId}
            edit={() => getActiveMessage(message.get("_id"))}
          />
        ))}
      </List>
      <Divider />
      <MessageAdd
        label="Your comment"
        submitHandler={sendHandler}
      />
    </CardContent>
  </Card>
);

Comments.propTypes = {
  getActiveMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  sendHandler: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired
};


export default Comments;
