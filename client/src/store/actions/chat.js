import {
  ATTEND_CHAT,
  ATTEND_CHAT_SUCCESS,
  FETCH_CHAT_ROOM,
  FETCH_CHAT_ROOM_SUCCESS,
  GET_MESSAGE_SUCCESS,
  LEAVE_CHAT,
  LEAVE_CHAT_SUCCESS,
  SEND_MESSAGE
} from "./types";

export const fetchChatRoom = userId => ({
  type: FETCH_CHAT_ROOM,
  payload: userId
});

export const fetchChatRoomSuccess = room => ({
  type: FETCH_CHAT_ROOM_SUCCESS,
  payload: room
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: message
});

export const attendChat = id => ({
  type: ATTEND_CHAT,
  payload: id
});

export const attendChatSuccess = () => ({
  type: ATTEND_CHAT_SUCCESS
});

export const getMessageSuccess = message => ({
  type: GET_MESSAGE_SUCCESS,
  payload: message
});

export const leaveChat = roomId => ({
  type: LEAVE_CHAT,
  payload: roomId
});

export const leaveChatSuccess = () => ({
  type: LEAVE_CHAT_SUCCESS
});
