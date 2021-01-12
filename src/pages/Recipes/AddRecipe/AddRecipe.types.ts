export const ADD_RECIPE = "recipe/addRecipe/ADD_RECIPE";
export interface AddRecipeAction {
  type: typeof ADD_RECIPE;
  payload: RecipeForm;
}

export const ADD_RECIPE_REQUEST = "recipe/addRecipe/ADD_RECIPE_REQUEST";
export type AddRecipeRequestAction = BaseRequestAction<
  typeof ADD_RECIPE_REQUEST
>;

export const ADD_RECIPE_SUCCESS = "recipe/addRecipe/ADD_RECIPE_SUCCESS";
export type AddRecipeSuccessAction = BaseSuccessAction<
  typeof ADD_RECIPE_SUCCESS,
  Record<string, unknown>
>;

export const ADD_RECIPE_FAILURE = "recipe/addRecipe/ADD_RECIPE_FAILURE";
export type AddRecipeFailureAction = BaseFailureAction<
  typeof ADD_RECIPE_FAILURE,
  { errors: { msg: string; param: string }[] }
>;

export type AddRecipeActionType =
  | AddRecipeAction
  | AddRecipeRequestAction
  | AddRecipeSuccessAction
  | AddRecipeFailureAction;
