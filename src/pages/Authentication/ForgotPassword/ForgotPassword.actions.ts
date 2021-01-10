import * as types from "./ForgotPassword.types";

export const forgotPassword = (
  payload: ForgotPasswordForm
): types.ForgotPasswordAction => ({
  type: types.FORGOT_PASSWORD,
  payload,
});

export const forgotPasswordRequest = (): types.ForgotPasswordRequestAction => ({
  type: types.FORGOT_PASSWORD_REQUEST,
});

export const forgotPasswordSuccess = (
  payload: Record<string, unknown>
): types.ForgotPasswordSuccessAction => ({
  type: types.FORGOT_PASSWORD_SUCCESS,
  payload,
});

export const forgotPasswordFailure = (
  error: Record<string, unknown>
): types.ForgotPasswordFailureAction => ({
  type: types.FORGOT_PASSWORD_FAILURE,
  error,
});
