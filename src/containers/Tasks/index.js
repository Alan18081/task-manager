import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTasks,changeTaskStatus} from '../../store/actions';

import Loader from '../../components/Loader';
import Task from '../../components/Task';

class Tasks extends Component {
    componentDidMount() {
        this.props.onFetchTasks();
    }
    renderTasks() {
        return this.props.tasks.map(task => (
           <Task
               isAdmin={this.props.isAdmin}
               task={task}
               key={task.get('id')}
               change={this.props.onChangeTaskStatus}
           />
        ));
    }
    render() {
        const {tasks} = this.props;
        if(!tasks) {
            return <Loader/>
        }
        return (
            <div>
                {this.renderTasks()}
            </div>
        );
    }
}

const mapStateToProps = ({tasks,user}) => ({
   tasks: tasks.get('list'),
   isAdmin: user.get('isAdmin')
});

const mapDispatchToProps = dispatch => ({
   onFetchTasks: () => dispatch(fetchTasks()),
   onChangeTaskStatus: (id,status) => dispatch(changeTaskStatus(id,status))
});

export default connect(mapStateToProps,mapDispatchToProps)(Tasks);
