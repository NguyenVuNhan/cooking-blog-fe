export const GET_RECIPE = "recipe/getRecipe/GET_RECIPE";
export interface GetRecipeAction {
  type: typeof GET_RECIPE;
  payload: string;
}

export const GET_RECIPE_REQUEST = "recipe/getRecipe/GET_RECIPE_REQUEST";
export type GetRecipeRequestAction = BaseRequestAction<
  typeof GET_RECIPE_REQUEST
>;

export const GET_RECIPE_SUCCESS = "recipe/getRecipe/GET_RECIPE_SUCCESS";
export type GetRecipeSuccessAction = BaseSuccessAction<
  typeof GET_RECIPE_SUCCESS,
  Recipe
>;

export const GET_RECIPE_FAILURE = "recipe/getRecipe/GET_RECIPE_FAILURE";
export type GetRecipeFailureAction = BaseFailureAction<
  typeof GET_RECIPE_FAILURE,
  Record<string, unknown>
>;

export type GetRecipeActionType =
  | GetRecipeAction
  | GetRecipeRequestAction
  | GetRecipeSuccessAction
  | GetRecipeFailureAction;
