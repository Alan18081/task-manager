import { call, take, put } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { fetchMessageSuccess, removeMessageSuccess, updateMessageSuccess } from "../../actions";

const SENT_MESSAGE_EVENT = "SENT_MESSAGE_EVENT";
const UPDATE_MESSAGE_EVENT = "UPDATE_MESSAGE_EVENT";
const REMOVED_MESSAGE_EVENT = "REMOVED_MESSAGE_EVENT";

export function* watchMessageSaga(socket) {
  const channel = new eventChannel(emit => {
    socket.on("addedMessage", message => {
      console.log(message);
      emit({type: SENT_MESSAGE_EVENT, payload: message});
    });

    socket.on("editedMessage",message => {
      emit({type: UPDATE_MESSAGE_EVENT, payload: message});
    });

    socket.on("removedMessage",({id}) => {
      emit({type: REMOVED_MESSAGE_EVENT, payload: id});
    });

    return () => {};
  });
  while (true) {
    let {type,payload} = yield take(channel);
    switch (type) {
      case UPDATE_MESSAGE_EVENT:
        yield put(updateMessageSuccess(payload));
        break;
      case SENT_MESSAGE_EVENT:
        yield put(fetchMessageSuccess(payload));
        break;
      case REMOVED_MESSAGE_EVENT:
        yield put(removeMessageSuccess(payload));
    }
  }
}
