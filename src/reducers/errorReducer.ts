import { loginTypes } from "pages/Authentication/Login";
import { registerTypes } from "pages/Authentication/Register";
import { addRecipeTypes } from "pages/AddRecipe";

export type ErrorAction =
  | loginTypes.LoginFailureAction
  | registerTypes.RegisterFailureAction
  | addRecipeTypes.AddRecipeFailureAction;

export interface ErrorState {
  [loginTypes.LOGIN]?: loginTypes.LoginFailureAction["error"];
  [registerTypes.REGISTER]?: registerTypes.RegisterFailureAction["error"];
  [addRecipeTypes.ADD_RECIPE]?: addRecipeTypes.AddRecipeFailureAction["error"];
}

const getErrorMatches = (actionType: string) =>
  /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(actionType);

const errorReducer = (
  state: ErrorState = {},
  action: ErrorAction
): ErrorState => {
  const matches = getErrorMatches(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === "FAILURE" ? action.error : null,
  };
};

export default errorReducer;
