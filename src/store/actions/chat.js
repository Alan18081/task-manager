import {FETCH_CHAT_ROOM,FETCH_CHAT_ROOM_SUCCESS,FETCH_CHAT_USER_SUCCESS,SEND_MESSAGE} from './types';

export const fetchChatRoom = userId => ({
  type: FETCH_CHAT_ROOM,
  payload: userId
});

export const fetchChatRoomSuccess = room => ({
  type: FETCH_CHAT_ROOM_SUCCESS,
  payload: room
});

export const fetchChatUserSuccess = user => ({
  type: FETCH_CHAT_USER_SUCCESS,
  payload: user
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: message
});