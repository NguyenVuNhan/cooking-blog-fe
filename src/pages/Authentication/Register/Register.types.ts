export const REGISTER = "auth/register/REGISTER";
export interface RegisterAction {
  type: typeof REGISTER;
  payload: RegisterForm;
}

export const REGISTER_REQUEST = "auth/register/REGISTER_REQUEST";
export type RegisterRequestAction = BaseRequestAction<typeof REGISTER_REQUEST>;

export const REGISTER_SUCCESS = "auth/register/REGISTER_SUCCESS";
export type RegisterSuccessAction = BaseSuccessAction<
  typeof REGISTER_SUCCESS,
  Record<string, unknown>
>;

export const REGISTER_FAILURE = "auth/register/REGISTER_FAILURE";
export type RegisterFailureAction = BaseFailureAction<
  typeof REGISTER_FAILURE,
  Record<string, unknown>
>;

export type RegisterActionType =
  | RegisterAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;
