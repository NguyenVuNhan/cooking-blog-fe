import { forwardTo } from "helpers/router";
import store from "providers/Store";
import {
  all,
  AllEffect,
  call,
  fork,
  ForkEffect,
  put,
  takeEvery,
} from "redux-saga/effects";
import {
  deleteRecipe,
  DeleteRecipeResponseData,
  getRecipe,
  GetRecipeResponseData,
  updateRecipe,
  UpdateRecipeResponseData,
} from "services/recipe";
import * as actions from "./Recipe.actions";
import * as types from "./Recipe.types";

// ======================================================================
// Get recipe
// ======================================================================
function* onGetRecipe({ payload: id }: types.GetRecipeAction) {
  yield put(actions.getRecipeRequest());
  // Check if recipe already exists in store
  const recipe = store.getState().recipe.recipe;
  if (recipe && recipe?._id === id) {
    yield put(actions.getRecipeSuccess(recipe));
  }
  try {
    const res: GetRecipeResponseData = yield call(getRecipe, id);

    // validate response
    if (!res.success || !res.data) {
      yield put(actions.getRecipeFailure({ error: res.message }));
      return;
    }

    const recipes = res.data.recipes;

    recipes.ingredients.forEach((value, index, arr) => {
      ((arr[index] as unknown) as Ingredient).ingredient =
        value.ingredient.name;
    });

    // Success
    yield put(actions.getRecipeSuccess((recipes as unknown) as Recipe));
  } catch (err) {
    yield put(actions.getRecipeFailure(err.response.data.data));
  }
}
function* watchOnGetRecipe() {
  yield takeEvery(types.GET_RECIPE, onGetRecipe);
}

// ======================================================================
// Update recipe
// ======================================================================
function* onUpdateRecipe({ payload }: types.UpdateRecipeAction) {
  yield put(actions.updateRecipeRequest());
  try {
    const res: UpdateRecipeResponseData = yield call(
      updateRecipe,
      payload.id,
      payload.data
    );

    // validate response
    if (!res.success || !res.data) {
      yield put(actions.updateRecipeFailure({ error: res.message }));
      return;
    }

    // Success
    yield put(actions.updateRecipeSuccess(res.data.title));
    // Fetch updated recipe
    yield put(actions.getRecipe(payload.id));
  } catch (err) {
    yield put(actions.updateRecipeFailure(err.response.data.data));
  }
}
function* watchOnUpdateRecipe() {
  yield takeEvery(types.UPDATE_RECIPE, onUpdateRecipe);
}

// ======================================================================
// Delete recipe
// ======================================================================
function* onDeleteRecipe({ payload: id }: types.DeleteRecipeAction) {
  yield put(actions.deleteRecipeRequest());
  try {
    const res: DeleteRecipeResponseData = yield call(deleteRecipe, id);

    // validate response
    if (!res.success || !res.data) {
      yield put(actions.deleteRecipeFailure({ error: res.message }));
      return;
    }

    // Success
    yield put(actions.deleteRecipeSuccess(res.data.title));
    forwardTo("/");
  } catch (err) {
    yield put(actions.deleteRecipeFailure(err.response.data.data));
  }
}
function* watchOnDeleteRecipe() {
  yield takeEvery(types.DELETE_RECIPE, onDeleteRecipe);
}

export default function* recipeSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([
    fork(watchOnGetRecipe),
    fork(watchOnDeleteRecipe),
    fork(watchOnUpdateRecipe),
  ]);
}
