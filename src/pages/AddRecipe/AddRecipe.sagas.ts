import { forwardTo } from "helpers/router";
import {
  all,
  AllEffect,
  call,
  fork,
  ForkEffect,
  put,
  takeEvery,
} from "redux-saga/effects";
import { addRecipe, AddRecipeResponseData } from "services/recipe";
import * as actions from "./AddRecipe.actions";
import * as types from "./AddRecipe.types";

function* onAddRecipe({ payload }: types.AddRecipeAction) {
  yield put(actions.addRecipeRequest());
  try {
    const res: AddRecipeResponseData = yield call(addRecipe, payload);

    // validate response
    if (!res.success || !res.data) {
      yield put(
        actions.addRecipeFailure({
          errors: [{ msg: res.message, param: "error" }],
        })
      );
      return;
    }

    // Success
    yield put(actions.addRecipeSuccess(res.data.user));
    forwardTo("/");
  } catch (err) {
    yield put(actions.addRecipeFailure(err.response.data.data));
  }
}

function* watchOnAddRecipe() {
  yield takeEvery(types.ADD_RECIPE, onAddRecipe);
}

export default function* addRecipeSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([fork(watchOnAddRecipe)]);
}
