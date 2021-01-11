export const SEARCH = "recipe/search/SEARCH";
export interface SearchAction {
  type: typeof SEARCH;
  payload: string;
}

export const SEARCH_REQUEST = "recipe/search/SEARCH_REQUEST";
export type SearchRequestAction = BaseRequestAction<typeof SEARCH_REQUEST>;

export const SEARCH_SUCCESS = "recipe/search/SEARCH_SUCCESS";
export type SearchSuccessAction = BaseSuccessAction<
  typeof SEARCH_SUCCESS,
  Recipes
>;

export const SEARCH_FAILURE = "recipe/search/SEARCH_FAILURE";
export type SearchFailureAction = BaseFailureAction<
  typeof SEARCH_FAILURE,
  Record<string, unknown>
>;

export type SearchActionType =
  | SearchAction
  | SearchRequestAction
  | SearchSuccessAction
  | SearchFailureAction;
