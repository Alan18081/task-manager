import React from "react";
import { connect } from "react-redux";
import {
  withStyles,
  Typography,
  Card,
  CardContent,
  List,
  Divider
} from "@material-ui/core";
import { addTaskComment } from "../../store/actions/index";

import Comment from "../../components/Comment/index.jsx";
import CommentAdd from "../../components/CommentAdd/index.jsx";

const Comments = ({ taskId, comments, onAddTaskComment }) => (
  <Card>
    <CardContent>
      <Typography variant="headline">Comments</Typography>
      <List>
        {comments.map(comment => (
          <Comment key={comment.get("id")} comment={comment} />
        ))}
      </List>
      <Divider />
      <CommentAdd
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
