import { loginTypes } from "pages/Authentication/Login";
import { addRecipeTypes } from "pages/Recipes/AddRecipe";

type ErrorAction =
  | loginTypes.LoginFailureAction
  | addRecipeTypes.AddRecipeFailureAction;

export interface ErrorState {
  [loginTypes.LOGIN]?: loginTypes.LoginFailureAction["error"];
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
