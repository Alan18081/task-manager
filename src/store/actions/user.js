import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  FETCH_USER,
  FETCH_USER_SUCCESS
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
