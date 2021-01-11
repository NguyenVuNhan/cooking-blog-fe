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
import { getRecipe, GetRecipeResponseData } from "services/recipe";
import * as actions from "./GetRecipe.actions";
import * as types from "./GetRecipe.types";

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

export default function* getRecipeSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([fork(watchOnGetRecipe)]);
}
