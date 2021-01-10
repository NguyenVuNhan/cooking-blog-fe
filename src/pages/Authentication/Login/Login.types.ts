export const LOGIN = "auth/login/LOGIN";
export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginForm;
}

export const LOGIN_REQUEST = "auth/login/LOGIN_REQUEST";
export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export const LOGIN_SUCCESS = "auth/login/LOGIN_SUCCESS";
export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: Record<string, unknown>;
}

export const LOGIN_FAILURE = "auth/login/LOGIN_FAILURE";
export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: Record<string, unknown>;
}

export type LoginActionType =
  | LoginAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction;
