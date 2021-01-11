import * as types from "./Search.types";

export const search = (payload: string): types.SearchAction => ({
  type: types.SEARCH,
  payload,
});

export const searchRequest = (): types.SearchRequestAction => ({
  type: types.SEARCH_REQUEST,
});

export const searchSuccess = (payload: Recipes): types.SearchSuccessAction => ({
  type: types.SEARCH_SUCCESS,
  payload,
});

export const searchFailure = (
  error: Record<string, unknown>
): types.SearchFailureAction => ({
  type: types.SEARCH_FAILURE,
  error,
});
