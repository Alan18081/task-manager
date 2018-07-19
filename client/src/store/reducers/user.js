import { fromJS } from "immutable";
import {
  FETCH_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_START,
  REGISTER_SUCCESS,
  UPDATE_PROFILE_SUCCESS
} from "../actions/types";

const initialState = fromJS({
  profile: null,
  isAdmin: false,
  loginLoading: false,
  registerLoading: false,
  loginErrors: fromJS([]),
  registerErrors: fromJS([])
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return state.merge({
        profile: fromJS(payload),
        isAdmin: payload.isAdmin
      });
    case UPDATE_PROFILE_SUCCESS:
      return state.set("profile", fromJS(payload));
    case LOGIN_START:
      return state.merge({
        loginErrors: fromJS([]),
        loginLoading: true
      });
    case LOGIN_SUCCESS:
      return state.set("loginLoading", false);
    case LOGIN_FAILED:
      return state.merge({
        loginErrors: fromJS(payload),
        loginLoading: false
      });
    case REGISTER_START:
      return state.merge({
        registerErrors: fromJS([]),
        registerLoading: true
      });
    case REGISTER_SUCCESS:
      return state.set("registerLoading", false);
    case REGISTER_FAILED:
      return state.merge({
        registerErrors: fromJS(payload),
        registerLoading: false
      });
    default:
      return state;
  }
};
