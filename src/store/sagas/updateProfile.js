import {put,call,takeLatest} from 'redux-saga/effects';
import axios from '../../axios';
import {UPDATE_PROFILE} from "../actions/types";
import {serverError, updateProfileSuccess} from "../actions";

export function* updateProfileSaga() {
    yield takeLatest(UPDATE_PROFILE,function* ({payload}) {
        try {
            const {data} = yield call(axios.put,'/user',payload);
            yield put(updateProfileSuccess(data));
        }
        catch (e) {
            console.log(e);
            yield put(serverError());
        }
    })
}