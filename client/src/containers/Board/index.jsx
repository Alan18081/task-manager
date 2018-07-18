import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {fetchAllTasks,fetchAllUsers} from '../../store/actions';
import {Drawer, Button, List, withStyles} from '@material-ui/core';
import {users as usersIcon} from 'react-icons-kit/icomoon/users';
import {Icon} from 'react-icons-kit';

import styles from './styles';

import Loader from '../../components/Loader';
import Task from '../../components/Task/index';
import User from '../../components/User/index';
import Title from '../../components/Title/index';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drawerOpened: false
		};

		this.toggleDrawer = this.toggleDrawer.bind(this);
	}

	componentDidMount() {
		this.props.onFetchAllTasks();
		this.props.onFetchAllUsers();
	}

	toggleDrawer() {
		this.setState({
			drawerOpened: !this.state.drawerOpened
		})
	}

	renderTasks() {
		return this.props.tasks.map(task => (
				<Task key={task.get('id')} task={task}/>
		))
	}

	renderUsers() {
		return this.props.users.map(user => (
			<User key={user.get('id')} user={user}/>
		));
	}

	render() {
		const {users,tasks,classes} = this.props;
		if(!users || !tasks) {
			return <Loader/>;
		}
		return (
				<Fragment>
					<Drawer open={this.state.drawerOpened} anchor="right" onClose={this.toggleDrawer}>
						<List>
							{this.renderUsers()}
						</List>
					</Drawer>
					<Title
						title="Board"
						Icon={() => <Icon icon={usersIcon}/>}
						clicked={this.toggleDrawer}
					/>
					<div className={classes.tasks}>
						{this.renderTasks()}
					</div>
				</Fragment>
		);
	}
}

const mapStateToProps = ({board}) => ({
	tasks: board.get('tasks'),
	users: board.get('users')
});

const mapDispatchToProps = dispatch => ({
	onFetchAllTasks: () => dispatch(fetchAllTasks()),
	onFetchAllUsers: () => dispatch(fetchAllUsers())
});

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Board));
