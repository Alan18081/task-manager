import {
  FETCH_ALL_USERS,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_USER,
  FETCH_USER_SUCCESS
} from "./types";

export const fetchAllUsers = () => ({
  type: FETCH_ALL_USERS
});

export const fetchAllUsersSuccess = users => ({
  type: FETCH_ALL_USERS_SUCCESS,
  payload: users
});

export const fetchUser = id => ({
  type: FETCH_USER,
  payload: id
});

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: user
});