import React, {Component} from 'react';
import {TextField,Button} from '@material-ui/core';
import {setTaskTime} from '../../store/actions/index';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class TaskTime extends Component {
  state = {
    time: ''
  };
  changeTime = ({target: {value}}) => {
    this.setState({
      time: value
    })
  };
  submit = event => {
    event.preventDefault();
    this.props.onSetTime(this.props.taskId,this.state.time);
  };
  render() {
    return (
      <form onSubmit={this.submit}>
        <TextField
          label="Estimated time for task"
          onChange={this.changeTime}
          value={this.state.time}
        />
        <Button type="submit" variant="outlined">Set</Button>
      </form>
    );
  }
}

TaskTime.propTypes = {
  taskId: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => ({
  onSetTime: (id,time) => dispatch(setTaskTime(id,time))
});


export default connect(null,mapDispatchToProps)(TaskTime);
