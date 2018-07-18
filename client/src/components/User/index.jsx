import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem,ListItemIcon,ListItemText, withStyles, Typography} from '@material-ui/core';
import {Icon} from 'react-icons-kit';
import {user as userIcon} from 'react-icons-kit/icomoon/user';

import styles from './styles';

const User = ({user, classes}) => (
		<Link to={`/users/${user.get('id')}/chat`} className={classes.container}>
			<ListItem button>
				<ListItemIcon>
					<Icon icon={userIcon}/>
				</ListItemIcon>
				<ListItemText>
					<Typography variant="title">{user.get('name')}</Typography>
				</ListItemText>
			</ListItem>
		</Link>
);

export default withStyles(styles)(User);