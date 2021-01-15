import { loginTypes } from "pages/Authentication/Login";
import { recipeTypes } from "pages/Recipe";

type LoadingAction =
  | loginTypes.LoginRequestAction
  | recipeTypes.GetRecipeRequestAction;

export interface LoadingState {
  [loginTypes.LOGIN]?: boolean;
  [recipeTypes.GET_RECIPE]?: boolean;
}

const getErrorMatches = (actionType: string) =>
  /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(actionType);

const loadingReducer = (
  state: LoadingState = {},
  action: LoadingAction
): LoadingState => {
  const matches = getErrorMatches(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === "REQUEST" ? true : false,
  };
};

export default loadingReducer;
