import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTasks} from '../../store/actions';

import Loader from '../../components/Loader';
import Task from '../../components/Task';

class Tasks extends Component {
    componentDidMount() {
        this.props.onFetchTasks();
    }
    renderTasks() {
        return this.props.tasks.map(task => (
           <Task task={task} key={new Date().getTime() + Math.random()}/>
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

const mapStateToProps = ({tasks}) => ({
   tasks: tasks.get('list')
});

const mapDispatchToProps = dispatch => ({
   onFetchTasks: () => dispatch(fetchTasks())
});

export default connect(mapStateToProps,mapDispatchToProps)(Tasks);
