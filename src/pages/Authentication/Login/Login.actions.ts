import * as types from "./Login.types";

export const login = (payload: LoginForm): types.LoginAction => ({
  type: types.LOGIN,
  payload,
});

export const loginRequest = (): types.LoginRequestAction => ({
  type: types.LOGIN_REQUEST,
});

export const loginSuccess = (
  payload: Record<string, unknown>
): types.LoginSuccessAction => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (
  payload: Record<string, unknown>
): types.LoginFailureAction => ({
  type: types.LOGIN_FAILURE,
  payload,
});
