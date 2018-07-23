import {
  ATTEND_CHAT,
  FETCH_CHAT_ROOM,
  FETCH_CHAT_ROOM_SUCCESS,
  LEAVE_CHAT,
} from "./types";

export const fetchChatRoom = userId => ({
  type: FETCH_CHAT_ROOM,
  payload: userId
});

export const fetchChatRoomSuccess = room => ({
  type: FETCH_CHAT_ROOM_SUCCESS,
  payload: room
});

export const attendChat = id => ({
  type: ATTEND_CHAT,
  payload: id
});

export const leaveChat = roomId => ({
  type: LEAVE_CHAT,
  payload: roomId
});

