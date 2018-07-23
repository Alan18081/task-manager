import React from "react";
import { Typography, Card, CardContent, Divider } from "@material-ui/core";
import PropTypes from "prop-types";

import MessagesList from "../MessagesList/index";
import MessageAdd from "../MessageAdd/index";
import MessageEdit from "../MessageEdit/index";

const Comments = ({
  userId,
  messages,
  sendHandler,
  getActiveMessage,
  removeMessage
}) => (
  <Card>
    <CardContent>
      <MessageEdit />
      <Typography variant="headline">Comments</Typography>
      <MessagesList
        messages={messages}
        getActiveMessage={getActiveMessage}
        removeMessage={removeMessage}
        userId={userId}
      />
      <Divider />
      <MessageAdd label="Your comment" submitHandler={sendHandler} />
    </CardContent>
  </Card>
);

Comments.propTypes = {
  getActiveMessage: PropTypes.func.isRequired,
  removeMessage: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  sendHandler: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired
};

export default Comments;
