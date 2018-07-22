import {take,put,select,call} from "redux-saga/effects";
import {eventChannel} from "redux-saga";
import {removeTaskSuccess,createTaskSuccess,changeTaskSuccess} from "../../actions";

const CREATED_TASK_EVENT = "CREATED_TASK_EVENT";
const CHANGED_TASK_EVENT = "CHANGED_TASK_EVENT";
const REMOVED_TASK_EVENT = "REMOVED_TASK_EVENT";


export function* watchTasksSaga() {
  const socket = yield select(({socket}) => socket);
  const channel = new eventChannel(emit => {

    socket.on("createdTask", task => {
      emit({type: CREATED_TASK_EVENT, payload: task});
    });

    socket.on("changedTask", task => {
      emit({type: CHANGED_TASK_EVENT, payload: task});
    });

    socket.on("removedTask", ({id}) => {
      emit({type: REMOVED_TASK_EVENT, payload: id});
    });

    return () => {

    }
  });

  while(true) {
    let {type,payload} = yield take(channel);
    switch (type) {
      case REMOVED_TASK_EVENT:
        yield put(removeTaskSuccess(payload));
        break;
      case CHANGED_TASK_EVENT:
        yield put(changeTaskSuccess(payload));
        break;
      case CREATED_TASK_EVENT:
        yield put(createTaskSuccess(payload));
    }
  }
}