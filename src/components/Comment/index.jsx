import React from "react";
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";

import MessageIcon from "@material-ui/icons/Message";

const Comment = ({ comment }) => (
  <ListItem>
    <ListItemIcon>
      <MessageIcon />
    </ListItemIcon>
    <ListItemText>
      <Typography variant="subheading" color="secondary">
        {comment.get("author")}
      </Typography>
      <Typography variant="body1">{comment.get("text")}</Typography>
      <Typography variant="caption">{comment.get("createdAt")}</Typography>
    </ListItemText>
  </ListItem>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;
