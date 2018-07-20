import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withStyles
} from "@material-ui/core";

import styles from "./styles";
import { ic_error_outline } from "react-icons-kit/md/ic_error_outline";
import { Icon } from "react-icons-kit";

const ServerError = ({ open }) => (
  <Dialog open={open}>
    <DialogTitle id="alert-dialog-title">
      Sorry, we have server trouble, please, try to reload page
    </DialogTitle>
    <DialogContent>
      <Icon icon={ic_error_outline} size={30} />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => location.reload()} color="primary" fullWidth>
        Reload page
      </Button>
    </DialogActions>
  </Dialog>
);

export default withStyles(styles)(ServerError);
