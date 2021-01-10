import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth";

export interface IRootState {
  auth: AuthState;
}

export default combineReducers({ auth: authReducer });
