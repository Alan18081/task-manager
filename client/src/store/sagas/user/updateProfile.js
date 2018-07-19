import { put, call, takeLatest } from "redux-saga/effects";
import axios from "../../../axios";
import { UPDATE_PROFILE } from "../../actions/types";
import { serverError, updateProfileSuccess } from "../../actions/index";

export function* updateProfileSaga() {
  yield takeLatest(UPDATE_PROFILE, function*({ payload }) {
    try {
      const { data } = yield call(axios.put, "/currentUser", payload);
      yield put(updateProfileSuccess(data));
    } catch (e) {
      yield put(serverError());
    }
  });
}
