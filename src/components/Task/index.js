import React, {Component} from 'react';
import moment from 'moment';
import {withStyles,Card,CardContent,Typography,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';

import TaskTime from '../../containers/TaskTime';

import styles from './styles';

const stages = [
  'To Do','In Progress','Peer Review','Done'
];

class Task extends Component {
  state = {
    activeTime: 0
  };
  interval;
  componentDidMount() {
    const {task} = this.props;
    const activeTime = task.get(task.get('activeStatus'));
    this.setState({
      activeTime
    });
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        activeTime: prevState.activeTime + 1000
      }));
    },1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const {classes,task,isAdmin,change} = this.props;
    return (
      <Card className={classes.container}>
        <CardContent>
          <Typography variant="headline">{task.get('title')}</Typography>
          <Typography variant="body1">{task.get('description')}</Typography>
          {!task.get('estimateTime') && <TaskTime taskId={task.get('id')}/>}
          <div className={classes.status}>
            {task.get('status') === stages[stages.length - 1] && !isAdmin
              ? <Typography variant="subheading" color="primary">{task.get('status')}</Typography>
              : <FormControl>
                <InputLabel htmlFor="status">Status</InputLabel>
                <Select
                  value={stages.find(stage => stage === task.get('status'))}
                  onChange={({target: {value}}) => change(task.get('id'),value)}
                  inputProps={{
                    id: 'status'
                  }}
                >
                  {task.get('statuses').mapEntries(([status,statusTime]) => {
                    if(status === stages[stages.length - 1] && !isAdmin) {
                      return null;
                    }
                    let time = '';
                    if(status === task.get('activeStatus')) {
                      time =`- ${moment(this.state.time).format('hh:mm:ss')}`;
                    }
                    else {
                      time = statusTime;
                    }
                    return <MenuItem key={status} value={status}>
                        {status} {time}
                      </MenuItem>
                  })}
                </Select>
              </FormControl>
            }
          </div>
        </CardContent>
      </Card>
    );
  }
}


export default withStyles(styles)(Task);