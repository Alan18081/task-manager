import {fromJS} from 'immutable';
import {FETCH_USER_SUCCESS,UPDATE_PROFILE_SUCCESS} from '../actions/types';

const initialState = fromJS({
   profile: null,
   isAdmin: false
});

export default (state = initialState, {type,payload}) => {
    switch (type) {
        case FETCH_USER_SUCCESS:
            return state.merge({
               profile: fromJS(payload),
               isAdmin: payload.isAdmin
            });
        case UPDATE_PROFILE_SUCCESS:
            return state.set('profile',fromJS(payload));
        default:
            return state;
    }
};