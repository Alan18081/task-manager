import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm,formValueSelector} from 'redux-form';
import {fetchActiveTask,createTask,fetchAllUsers} from '../../store/actions';
import { getPerformers } from "../../selectors";
import {validateTask} from '../../utils/validate';

const selector = formValueSelector("createTask");

export default (WrappedComponent) => {
  class TaskCreate extends Component {
    constructor(props) {
      super(props);
      this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
      const {onFetchActiveTask, onFetchAllUsers, history, match, isAdmin} = this.props;
      if(!isAdmin) {
        history.replace("/tasks");
      }
      else {
        onFetchActiveTask(match.params.id);
        onFetchAllUsers();
      }
    }

    submitHandler(info) {
      const {onCreateTask} = this.props;
      onCreateTask(info);
    }

    render() {
      return <WrappedComponent
        {...this.props}
        submit={this.submitHandler}
      />
    }
  }

  const mapStateToProps = state => ({
    users: getPerformers(state),
    task: state.tasks.get('activeTask'),
    isAdmin: state.user.get('isAdmin'),
    performer: selector(state.board, "performer")
  });

  const mapDispatchToProps = dispatch => ({
    onFetchActiveTask: id => dispatch(fetchActiveTask(id)),
    onCreateTask: task => dispatch(createTask(task)),
    onFetchAllUsers: () => dispatch(fetchAllUsers())
  });

  return connect(mapStateToProps,mapDispatchToProps)(reduxForm({
    form: "createTask",
    validate: validateTask
  })(TaskCreate));
}