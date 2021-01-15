import * as types from "./Recipe.types";

// ======================================================================
// Update recipe
// ======================================================================
export const updateRecipe = (
  id: string,
  data: Partial<RecipeForm>
): types.UpdateRecipeAction => ({
  type: types.UPDATE_RECIPE,
  payload: { id, data },
});

export const updateRecipeRequest = (): types.UpdateRecipeRequestAction => ({
  type: types.UPDATE_RECIPE_REQUEST,
});

export const updateRecipeSuccess = (
  payload: string
): types.UpdateRecipeSuccessAction => ({
  type: types.UPDATE_RECIPE_SUCCESS,
  payload,
});

export const updateRecipeFailure = (
  error: Record<string, unknown>
): types.UpdateRecipeFailureAction => ({
  type: types.UPDATE_RECIPE_FAILURE,
  error,
});

// ======================================================================
// Delete recipe
// ======================================================================
export const deleteRecipe = (payload: string): types.DeleteRecipeAction => ({
  type: types.DELETE_RECIPE,
  payload,
});

export const deleteRecipeRequest = (): types.DeleteRecipeRequestAction => ({
  type: types.DELETE_RECIPE_REQUEST,
});

export const deleteRecipeSuccess = (
  payload: string
): types.DeleteRecipeSuccessAction => ({
  type: types.DELETE_RECIPE_SUCCESS,
  payload,
});

export const deleteRecipeFailure = (
  error: Record<string, unknown>
): types.DeleteRecipeFailureAction => ({
  type: types.DELETE_RECIPE_FAILURE,
  error,
});

// ======================================================================
// Get recipe
// ======================================================================
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
