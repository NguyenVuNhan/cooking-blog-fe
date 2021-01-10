export const FORGOT_PASSWORD = "auth/forgotPassword/FORGOT_PASSWORD";
export interface ForgotPasswordAction {
  type: typeof FORGOT_PASSWORD;
  payload: ForgotPasswordForm;
}

export const FORGOT_PASSWORD_REQUEST =
  "auth/forgotPassword/FORGOT_PASSWORD_REQUEST";
export type ForgotPasswordRequestAction = BaseRequestAction<
  typeof FORGOT_PASSWORD_REQUEST
>;

export const FORGOT_PASSWORD_SUCCESS =
  "auth/forgotPassword/FORGOT_PASSWORD_SUCCESS";
export type ForgotPasswordSuccessAction = BaseSuccessAction<
  typeof FORGOT_PASSWORD_SUCCESS,
  Record<string, unknown>
>;

export const FORGOT_PASSWORD_FAILURE =
  "auth/forgotPassword/FORGOT_PASSWORD_FAILURE";
export type ForgotPasswordFailureAction = BaseFailureAction<
  typeof FORGOT_PASSWORD_FAILURE,
  Record<string, unknown>
>;

export type ForgotPasswordActionType =
  | ForgotPasswordAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction;
