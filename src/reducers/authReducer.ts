import { loginTypes } from "pages/Authentication/Login";

export interface AuthState {
  authenticated: boolean;
}

type AuthActionType = loginTypes.LoginSuccessAction;

const initialState: AuthState = {
  authenticated: false,
};

const authReducer = (
  state = initialState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case loginTypes.LOGIN_SUCCESS:
      return { ...state, authenticated: true };
    default:
      return state;
  }
};

export default authReducer;
