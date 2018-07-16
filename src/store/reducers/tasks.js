import {fromJS} from 'immutable';
import {FETCH_TASKS_SUCCESS} from "../actions/types";

const initialState = fromJS({
    list: null
});

export default (state = initialState,{type,payload}) => {
  switch (type) {
      case FETCH_TASKS_SUCCESS:
          return state.set('list',fromJS(payload));
      default:
          return state;
  }
};