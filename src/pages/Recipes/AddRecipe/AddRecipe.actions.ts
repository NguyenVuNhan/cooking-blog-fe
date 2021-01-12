import * as types from "./AddRecipe.types";

export const addRecipe = (payload: RecipeForm): types.AddRecipeAction => ({
  type: types.ADD_RECIPE,
  payload,
});

export const addRecipeRequest = (): types.AddRecipeRequestAction => ({
  type: types.ADD_RECIPE_REQUEST,
});

export const addRecipeSuccess = (
  payload: Record<string, unknown>
): types.AddRecipeSuccessAction => ({
  type: types.ADD_RECIPE_SUCCESS,
  payload,
});

export const addRecipeFailure = (error: {
  errors: { msg: string; param: string }[];
}): types.AddRecipeFailureAction => ({
  type: types.ADD_RECIPE_FAILURE,
  error,
});
