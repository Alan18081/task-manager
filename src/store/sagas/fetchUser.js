import {call,put,take} from 'redux-saga/effects';
import axios from '../../axios';
import {FETCH_USER} from '../actions/types';
import {fetchUserSuccess,serverError} from '../actions';

export function* fetchUserSaga() {
    try {
        yield take(FETCH_USER);
        const {data} = yield call(axios.get,'/user');
        yield put(fetchUserSuccess(data));
    }
    catch (e) {
        console.log(e);
        yield put(serverError());
    }
}