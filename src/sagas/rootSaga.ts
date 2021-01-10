import { forgotPasswordSaga } from "pages/Authentication/ForgotPassword";
import { loginSaga } from "pages/Authentication/Login";
import { registerSaga } from "pages/Authentication/Register";
import { all, AllEffect, fork, ForkEffect } from "redux-saga/effects";

export default function* rootSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([fork(loginSaga), fork(registerSaga), fork(forgotPasswordSaga)]);
}
