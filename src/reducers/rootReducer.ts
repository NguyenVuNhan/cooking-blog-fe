import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";
import errorReducer, { ErrorState } from "./errorReducer";
import loadingReducer, { LoadingState } from "./loadingReducer";

export interface IRootState {
  auth: AuthState;
  error: ErrorState;
  loading: LoadingState;
}

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  loading: loadingReducer,
});
