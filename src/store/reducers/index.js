import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import user from './user';
import tasks from './tasks';

export default combineReducers({
    user,
    tasks,
    form
})