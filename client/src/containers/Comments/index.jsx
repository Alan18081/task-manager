import React from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  Divider
} from "@material-ui/core";
import { sendTaskMessage} from "../../store/actions/index";

import Message from "../../components/Message/index";
import MessageAdd from "../../components/MessageAdd/index";

const Comments = ({ taskId, messages, sendHandler }) => (
  <Card>
    <CardContent>
      <Typography variant="headline">Comments</Typography>
      <List>
        {messages.map(comment => (
          <Message key={comment.get("_id")} message={comment} />
        ))}
      </List>
      <Divider />
      <MessageAdd
        label="Your comment"
        submitHandler={sendTaskMessage}
      />
    </CardContent>
  </Card>
);


export default Comments;
