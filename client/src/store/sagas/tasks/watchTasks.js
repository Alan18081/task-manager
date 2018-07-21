import {take,put,select,call} from "redux-saga/effects";
import {eventChannel} from "redux-saga";
import {removeTaskSuccess} from "../../actions";

import {fetchTaskByIdSaga} from "./fetchTaskById";

const CREATED_TASK_EVENT = "CREATED_TASK_EVENT";
const CHANGED_TASK_EVENT = "CHANGED_TASK_EVENT";
const REMOVED_TASK_EVENT = "REMOVED_TASK_EVENT";


export function* watchTasksSaga() {
  const socket = yield select(({socket}) => socket);
  const channel = new eventChannel(emit => {

    socket.on("createdTask", ({id}) => {
      emit({type: CREATED_TASK_EVENT, payload: id});
    });

    socket.on("changedTask", ({id}) => {
      emit({type: CHANGED_TASK_EVENT, payload: id});
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
        console.log(type,payload);
        yield put(removeTaskSuccess(payload));
        break;
      case CHANGED_TASK_EVENT:
        console.log(type,payload);
        yield call(fetchTaskByIdSaga,payload);
        break;
      case CREATED_TASK_EVENT:
        console.log(type,payload);
        yield call(fetchTaskByIdSaga,payload);
    }
  }
}