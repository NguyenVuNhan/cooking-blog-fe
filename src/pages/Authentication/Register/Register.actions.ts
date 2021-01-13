import * as types from "./Register.types";

export const register = (payload: RegisterForm): types.RegisterAction => ({
  type: types.REGISTER,
  payload,
});

export const registerRequest = (): types.RegisterRequestAction => ({
  type: types.REGISTER_REQUEST,
});

export const registerSuccess = (
  payload: BasePayload
): types.RegisterSuccessAction => ({
  type: types.REGISTER_SUCCESS,
  payload,
});

export const registerFailure = (
  error: BaseError
): types.RegisterFailureAction => ({
  type: types.REGISTER_FAILURE,
  error,
});
