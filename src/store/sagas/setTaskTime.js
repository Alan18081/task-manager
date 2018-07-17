import {call,put,take} from 'redux-saga/effects';
import axios from '../../axios';
import {SET_TASK_TIME} from '../actions/types';
import {serverError,changeTaskSuccess} from '../actions';

export function* setTaskTime() {
  try {
    const {payload: {id,time}} = yield take(SET_TASK_TIME);
    const {data} = yield call(axios.patch,`/tasks/${id}`,{
      estimatedTime: time
    });
    yield put(changeTaskSuccess(data));
  }
  catch (e) {
    console.log(e);
    yield put(serverError());
  }
}