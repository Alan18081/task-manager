import React from "react";
import { connect } from "react-redux";
import {
  Typography,
  Card,
  CardContent,
  List,
  Divider
} from "@material-ui/core";
import { addTaskComment } from "../../store/actions/index";

import Message from "../../components/Message/index";
import MessageAdd from "../../components/MessageAdd/index";

const Comments = ({ taskId, messages, onAddTaskMessage }) => (
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
        submitHandler={({ text }) => onAddTaskMessage(taskId, text)}
      />
    </CardContent>
  </Card>
);

const mapDispatchToProps = dispatch => ({
  onAddTaskMessage: (taskId, text) => dispatch(addTaskComment(taskId, text))
});

export default connect(
  null,
  mapDispatchToProps
)(Comments);
