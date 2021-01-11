import { combineReducers } from "redux";
import authReducer, { AuthState } from "./authReducer";
import errorReducer, { ErrorState } from "./errorReducer";
import loadingReducer, { LoadingState } from "./loadingReducer";
import recipeReducer, { RecipeState } from "./recipeReducer";

export interface IRootState {
  auth: AuthState;
  error: ErrorState;
  loading: LoadingState;
  recipe: RecipeState;
}

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  loading: loadingReducer,
  recipe: recipeReducer,
});
