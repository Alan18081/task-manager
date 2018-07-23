import React, {Component} from "react";
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "moment";
import {ic_close} from "react-icons-kit/md/ic_close";
import {Icon} from "react-icons-kit";

import MessageIcon from "@material-ui/icons/Message";

class Message extends Component {
  render() {
    const { message, edit, editable, remove } = this.props;
    return (
      <ListItem button={editable} onClick={editable ? edit : () => {}}>
        <ListItemIcon>
          <MessageIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography
            variant="subheading"
            color={editable ? "primary" : "secondary"}
          >
            {message.get("author").get("name")}
          </Typography>
          <Typography variant="body1">{message.get("text")}</Typography>
          <Typography variant="caption">
            {moment(message.get("createdAt")).format("MMMM Do, h:mm:ss a")}
          </Typography>
        </ListItemText>
        {editable && (
          <ListItemSecondaryAction>
            <IconButton color="secondary" onClick={remove}>
              <Icon icon={ic_close} size={20}/>
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired
};

export default Message;
