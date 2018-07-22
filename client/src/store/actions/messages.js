import {
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGES_LIST_SUCCESS,
  SEND_CHAT_MESSAGE,
  SEND_TASK_MESSAGE,
  RESET_ACTIVE_MESSAGE,
  GET_ACTIVE_MESSAGE,
  REMOVE_MESSAGE,
  REMOVE_MESSAGE_SUCCESS,
  UPDATE_MESSAGE,
  UPDATE_MESSAGE_SUCCESS
} from "./types";

export const fetchMessagesListSuccess = messages => ({
  type: FETCH_MESSAGES_LIST_SUCCESS,
  payload: messages
});

export const fetchMessageSuccess = message => ({
  type: FETCH_MESSAGE_SUCCESS,
  payload: message
});

export const sendChatMessage = message => ({
  type: SEND_CHAT_MESSAGE,
  payload: message
});

export const sendTaskMessage = (id,message) => ({
  type: SEND_TASK_MESSAGE,
  payload: {
    id,message
  }
});

export const getActiveMessage = id => ({
  type: GET_ACTIVE_MESSAGE,
  payload: id
});

export const resetActiveMessage = () => ({
  type: RESET_ACTIVE_MESSAGE
});

export const updateMessage = (id,text) => ({
  type: UPDATE_MESSAGE,
  payload: {
    id,text
  }
});

export const updateMessageSuccess = message => ({
  type: UPDATE_MESSAGE_SUCCESS,
  payload: message
});

export const removeMessage = (messageId,roomId) => ({
  type: REMOVE_MESSAGE,
  payload: {
    messageId,
    roomId
  }
});

export const removeMessageSuccess = id => ({
  type: REMOVE_MESSAGE_SUCCESS,
  payload: id
});