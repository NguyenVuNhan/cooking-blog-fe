// ======================================================================
// Update recipe
// ======================================================================
export const UPDATE_RECIPE = "recipe/UPDATE_RECIPE";
export interface UpdateRecipeAction {
  type: typeof UPDATE_RECIPE;
  payload: { id: string; data: Partial<RecipeForm> };
}

export const UPDATE_RECIPE_REQUEST = "recipe/UPDATE_RECIPE_REQUEST";
export type UpdateRecipeRequestAction = BaseRequestAction<
  typeof UPDATE_RECIPE_REQUEST
>;

export const UPDATE_RECIPE_SUCCESS = "recipe/UPDATE_RECIPE_SUCCESS";
export type UpdateRecipeSuccessAction = BaseSuccessAction<
  typeof UPDATE_RECIPE_SUCCESS,
  string
>;

export const UPDATE_RECIPE_FAILURE = "recipe/UPDATE_RECIPE_FAILURE";
export type UpdateRecipeFailureAction = BaseFailureAction<
  typeof UPDATE_RECIPE_FAILURE,
  Record<string, unknown>
>;

// ======================================================================
// Delete recipe
// ======================================================================
export const DELETE_RECIPE = "recipe/DELETE_RECIPE";
export interface DeleteRecipeAction {
  type: typeof DELETE_RECIPE;
  payload: string;
}

export const DELETE_RECIPE_REQUEST = "recipe/DELETE_RECIPE_REQUEST";
export type DeleteRecipeRequestAction = BaseRequestAction<
  typeof DELETE_RECIPE_REQUEST
>;

export const DELETE_RECIPE_SUCCESS = "recipe/DELETE_RECIPE_SUCCESS";
export type DeleteRecipeSuccessAction = BaseSuccessAction<
  typeof DELETE_RECIPE_SUCCESS,
  string
>;

export const DELETE_RECIPE_FAILURE = "recipe/DELETE_RECIPE_FAILURE";
export type DeleteRecipeFailureAction = BaseFailureAction<
  typeof DELETE_RECIPE_FAILURE,
  Record<string, unknown>
>;

// ======================================================================
// Get recipe
// ======================================================================
export const GET_RECIPE = "recipe/GET_RECIPE";
export interface GetRecipeAction {
  type: typeof GET_RECIPE;
  payload: string;
}

export const GET_RECIPE_REQUEST = "recipe/GET_RECIPE_REQUEST";
export type GetRecipeRequestAction = BaseRequestAction<
  typeof GET_RECIPE_REQUEST
>;

export const GET_RECIPE_SUCCESS = "recipe/GET_RECIPE_SUCCESS";
export type GetRecipeSuccessAction = BaseSuccessAction<
  typeof GET_RECIPE_SUCCESS,
  Recipe
>;

export const GET_RECIPE_FAILURE = "recipe/GET_RECIPE_FAILURE";
export type GetRecipeFailureAction = BaseFailureAction<
  typeof GET_RECIPE_FAILURE,
  Record<string, unknown>
>;

export type RecipeActionType =
  | GetRecipeAction
  | GetRecipeRequestAction
  | GetRecipeSuccessAction
  | GetRecipeFailureAction
  | UpdateRecipeAction
  | UpdateRecipeRequestAction
  | UpdateRecipeSuccessAction
  | UpdateRecipeFailureAction
  | DeleteRecipeAction
  | DeleteRecipeRequestAction
  | DeleteRecipeSuccessAction
  | DeleteRecipeFailureAction;
