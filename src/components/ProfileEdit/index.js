import React, {Component} from 'react';
import {reduxForm,Field} from 'redux-form';
import Input from '../Input/index';
import {Card,CardContent,CardActions,Button,withStyles,Typography} from '@material-ui/core';
import {validateProfile} from '../../utils/validate';

import AccountIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import DateIcon from '@material-ui/icons/DateRange';

import styles from './styles';

class EditProfile extends Component {
    render() {
        const {handleSubmit,classes} = this.props;
        return (
            <div className={classes.container}>
                <Typography variant="display1" align="center">Edit profile</Typography>
                <form onSubmit={handleSubmit(this.props.onSave)} className={classes.form}>
                    <Card>
                        <CardContent>
                            <Field
                                name="name"
                                component={Input}
                                label="Name"
                                Icon={AccountIcon}
                                className={classes.input}
                            />
                            <Field
                                name="email"
                                component={Input}
                                label="Name"
                                Icon={MailIcon}
                                className={classes.input}
                            />
                            <Field
                                name="birth"
                                component={Input}
                                label="Date of birth"
                                Icon={DateIcon}
                                className={classes.input}
                            />
                        </CardContent>
                        <CardActions className={classes.actions}>
                            <Button onClick={this.props.toggle} variant="outlined" color="secondary">Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">Save</Button>
                        </CardActions>
                    </Card>
                </form>
            </div>
        );
    }
}


export default reduxForm({
    form: 'editProfile',
    validate: validateProfile
})(withStyles(styles)(EditProfile));
