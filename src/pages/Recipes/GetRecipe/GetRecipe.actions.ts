import * as types from "./GetRecipe.types";

export const getRecipe = (payload: string): types.GetRecipeAction => ({
  type: types.GET_RECIPE,
  payload,
});

export const getRecipeRequest = (): types.GetRecipeRequestAction => ({
  type: types.GET_RECIPE_REQUEST,
});

export const getRecipeSuccess = (
  payload: Recipe
): types.GetRecipeSuccessAction => ({
  type: types.GET_RECIPE_SUCCESS,
  payload,
});

export const getRecipeFailure = (
  error: Record<string, unknown>
): types.GetRecipeFailureAction => ({
  type: types.GET_RECIPE_FAILURE,
  error,
});
