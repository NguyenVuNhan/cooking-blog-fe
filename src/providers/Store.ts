import rootReducer from "reducers";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

const initialState = {};

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "production"
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (f: any) => f
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
