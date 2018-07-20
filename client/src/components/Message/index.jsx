import React from "react";
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";

import MessageIcon from "@material-ui/icons/Message";

const Message = ({ message }) => (
  <ListItem>
    <ListItemIcon>
      <MessageIcon />
    </ListItemIcon>
    <ListItemText>
      <Typography variant="subheading" color="secondary">
        {message.get("author").get("name")}
      </Typography>
      <Typography variant="body1">{message.get("text")}</Typography>
      <Typography variant="caption">
        {moment(message.get("createdAt")).format("MMMM Do, h:mm:ss a")}
      </Typography>
    </ListItemText>
  </ListItem>
);

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
