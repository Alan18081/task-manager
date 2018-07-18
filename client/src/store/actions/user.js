import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  REGISTER,
  REGISTER_FAILED,
  LOGIN_START,
  REGISTER_START,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";

export const fetchUser = () => ({
  type: FETCH_USER
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
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
