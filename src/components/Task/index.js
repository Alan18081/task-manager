import React from 'react';
import {withStyles,Card,CardContent,Typography,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';

import styles from './styles';

const stages = [
  'To Do','In Progress','Peer Review','Done'
];

const Task = ({task,classes,change,isAdmin}) => (
    <Card className={classes.container}>
        <CardContent>
            <Typography variant="headline">{task.get('title')}</Typography>
            <Typography variant="body1">{task.get('description')}</Typography>
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
                                {stages.map(stage => {
                                    if(stage === stages[stages.length - 1] && !isAdmin) {
                                        return null;
                                    }
                                    return <MenuItem key={stage} value={stage}>{stage}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                }
            </div>
        </CardContent>
    </Card>
);

export default withStyles(styles)(Task);