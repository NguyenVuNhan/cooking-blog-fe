import {
  all,
  AllEffect,
  call,
  fork,
  ForkEffect,
  put,
  takeEvery,
} from "redux-saga/effects";
import { search, SearchResponseData } from "services/recipe";
import * as actions from "./Search.actions";
import * as types from "./Search.types";

function* onSearch({ payload }: types.SearchAction) {
  yield put(actions.searchRequest());
  try {
    const res: SearchResponseData = yield call(search, payload);

    // validate response
    if (!res.success || !res.data) {
      yield put(actions.searchFailure({ error: res.message }));
      return;
    }

    // Success
    yield put(actions.searchSuccess(res.data.recipes));
  } catch (err) {
    yield put(actions.searchFailure(err.response.data.data));
  }
}

function* watchOnSearch() {
  yield takeEvery(types.SEARCH, onSearch);
}

export default function* searchSaga(): Generator<AllEffect<ForkEffect>> {
  yield all([fork(watchOnSearch)]);
}
