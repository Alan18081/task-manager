import {
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGES_LIST_SUCCESS
} from "./types";

export const fetchMessagesListSuccess = messages => ({
  type: FETCH_MESSAGES_LIST_SUCCESS,
  payload: messages
});

export const fetchMessageSuccess = message => ({
  type: FETCH_MESSAGE_SUCCESS,
  payload: task
});