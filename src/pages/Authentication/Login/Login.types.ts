export const LOGIN = "auth/login/LOGIN";
export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginForm;
}

export const LOGIN_REQUEST = "auth/login/LOGIN_REQUEST";
export type LoginRequestAction = BaseRequestAction<typeof LOGIN_REQUEST>;

export const LOGIN_SUCCESS = "auth/login/LOGIN_SUCCESS";
export type LoginSuccessAction = BaseSuccessAction<typeof LOGIN_SUCCESS, IUser>;

export const LOGIN_FAILURE = "auth/login/LOGIN_FAILURE";
export type LoginFailureAction = BaseFailureAction<typeof LOGIN_FAILURE>;

export type LoginActionType =
  | LoginAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
