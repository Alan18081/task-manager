import React, { Component } from "react";
import { TextField, Button, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setTaskTime } from "../../store/actions/index";

import styles from "./styles";

class TaskTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ""
    };

    this.changeTime = this.changeTime.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeTime({ target: { value } }) {
    this.setState({
      time: value
    });
  }

  submit(event) {
    event.preventDefault();
    this.props.onSetTime(this.props.taskId, this.state.time);
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submit}>
        <TextField
          label="Estimated time for task"
          onChange={this.changeTime}
          value={this.state.time}
        />
        <Button className={classes.btn} type="submit" variant="outlined">
          Set
        </Button>
      </form>
    );
  }
}

TaskTime.propTypes = {
  taskId: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  onSetTime: (id, time) => dispatch(setTaskTime(id, time))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(TaskTime));
