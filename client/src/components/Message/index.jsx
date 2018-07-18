import React from "react";
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";

import MessageIcon from "@material-ui/icons/Message";

const Message = ({ message }) => (
  <ListItem>
    <ListItemIcon>
      <MessageIcon />
    </ListItemIcon>
    <ListItemText>
      <Typography variant="subheading" color="secondary">
        {message.get("author")}
      </Typography>
      <Typography variant="body1">{message.get("text")}</Typography>
      <Typography variant="caption">{message.get("createdAt")}</Typography>
    </ListItemText>
  </ListItem>
);

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
