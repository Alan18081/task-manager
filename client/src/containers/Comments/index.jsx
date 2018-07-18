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

import Message from "../../components/Message/index.jsx";
import MessageAdd from "../../components/MessageAdd/index.jsx";

const Comments = ({ taskId, comments, onAddTaskComment }) => (
  <Card>
    <CardContent>
      <Typography variant="headline">Comments</Typography>
      <List>
        {comments.map(comment => (
          <Message key={comment.get("id")} message={comment} />
        ))}
      </List>
      <Divider />
      <MessageAdd
        submitHandler={({ text }) => onAddTaskComment(taskId, text)}
      />
    </CardContent>
  </Card>
);

const mapDispatchToProps = dispatch => ({
  onAddTaskComment: (taskId, text) => dispatch(addTaskComment(taskId, text))
});

export default connect(
  null,
  mapDispatchToProps
)(Comments);
