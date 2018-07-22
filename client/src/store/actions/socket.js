import {SET_SOCKET_CONNECTION,SET_SOCKET_CONNECTION_SUCCESS} from "./types";

export const setSocketConnection = () => ({
  type: SET_SOCKET_CONNECTION
});

export const setSocketConnectionSuccess = socket => ({
  type: SET_SOCKET_CONNECTION_SUCCESS,
  payload: socket
});