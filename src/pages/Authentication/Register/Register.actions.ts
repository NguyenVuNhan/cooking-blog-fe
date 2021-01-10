import * as types from "./Register.types";

export const register = (payload: RegisterForm): types.RegisterAction => ({
  type: types.REGISTER,
  payload,
});

export const registerRequest = (): types.RegisterRequestAction => ({
  type: types.REGISTER_REQUEST,
});

export const registerSuccess = (
  payload: Record<string, unknown>
): types.RegisterSuccessAction => ({
  type: types.REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (
  error: Record<string, unknown>
): types.RegisterFailureAction => ({
  type: types.REGISTER_FAILURE,
  error,
});
