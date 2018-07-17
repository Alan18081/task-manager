import React from 'react';
import {withStyles, Typography, IconButton} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const Title = ({classes,title,Icon,clicked}) => (
	<div className={classes.container}>
		<Typography variant="display1">{title}</Typography>
		<IconButton onClick={clicked} color="primary">
			<Icon/>
		</IconButton>
	</div>
);

Title.propTypes = {
	title: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	clicked: PropTypes.func.isRequired
};

export default withStyles(styles)(Title);