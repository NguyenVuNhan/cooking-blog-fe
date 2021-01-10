import {
  all,
  AllEffect,
  call,
  fork,
  ForkEffect,
  put,
  takeEvery,
} from "redux-saga/effects";
import { forgotPassword, ForgotPasswordResponseData } from "services/auth";
import * as actions from "./ForgotPassword.actions";
import * as types from "./ForgotPassword.types";

function* onForgotPassword({ payload }: types.ForgotPasswordAction) {
  yield put(actions.forgotPasswordRequest());
  try {
    const res: ForgotPasswordResponseData = yield call(forgotPassword, payload);

    // validate response
    if (!res.success || !res.data) {
      yield put(actions.forgotPasswordFailure({ error: res.message }));
      return;
    }

    // Success
    yield put(actions.forgotPasswordSuccess(res.data.user));
  } catch (err) {
    yield put(actions.forgotPasswordFailure(err.response.data.data));
  }
}

function* watchOnForgotPassword() {
  yield takeEvery(types.FORGOT_PASSWORD, onForgotPassword);
}

export default function* forgotPasswordSaga(): Generator<
  AllEffect<ForkEffect>
> {
  yield all([fork(watchOnForgotPassword)]);
}
