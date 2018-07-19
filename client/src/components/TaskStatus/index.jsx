import React from "react";
import {
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import { stages } from "../../config";

import styles from "./styles";

const TaskStatus = ({ classes, change, isAdmin, status }) => (
  <div className={classes.container}>
    {status === stages[stages.length - 1] && !isAdmin ? (
      <Typography variant="subheading" color="primary">
        {status}
      </Typography>
    ) : (
      <FormControl>
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select
          value={status}
          onChange={change}
          inputProps={{
            id: "status"
          }}
        >
          {stages.map(stage => {
            if (stage === stages[stages.length - 1] && !isAdmin) {
              return null;
            }
            return (
              <MenuItem key={stage} value={stage}>
                {stage}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    )}
  </div>
);

TaskStatus.propTypes = {
  change: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

export default withStyles(styles)(TaskStatus);
