import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  FETCH_LOGGED_USER,
  FETCH_LOGGED_USER_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_FAILED,
  LOGIN_START,
  REGISTER_START,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  CHANGE_USER_STATUS
} from "./types";

export const fetchLoggedUser = () => ({
  type: FETCH_LOGGED_USER
});

export const fetchLoggedUserSuccess = user => ({
  type: FETCH_LOGGED_USER_SUCCESS,
  payload: user
});

export const updateProfile = profile => ({
  type: UPDATE_PROFILE,
  payload: profile
});

export const updateProfileSuccess = profile => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile
});

export const login = (login, password) => ({
  type: LOGIN,
  payload: {
    login,
    password
  }
});

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFailed = error => ({
  type: LOGIN_FAILED,
  payload: error
});

export const register = (name, email, password) => ({
  type: REGISTER,
  payload: {
    name,
    email,
    password
  }
});

export const registerStart = () => ({
  type: REGISTER_START
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerFailed = error => ({
  type: REGISTER_FAILED,
  payload: error
});

export const logout = () => ({
  type: LOGOUT
});

export const changeUserStatus = (status) => ({
  type: CHANGE_USER_STATUS,
  payload: status
});
