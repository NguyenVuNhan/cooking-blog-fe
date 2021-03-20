import App from "app/App";
import axios from "axios";
import dotenv from "dotenv";
import { clearAuthToken, setAuthToken } from "helpers/Token";
import jwt_decode from "jwt-decode";
import { loginActions } from "pages/Authentication/Login";
import store, { sagaMiddleware } from "providers/Store";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import rootSaga from "sagas/rootSaga";
import reportWebVitals from "./reportWebVitals";

dotenv.config({ path: __dirname + "/../.env" });

// Set axios base url
if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
}

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode<MyToken>(localStorage.jwtToken);

  store.dispatch(loginActions.loginSuccess(decoded as IUser));

  const currentTime = Date.now() / 1000;
  if (currentTime > decoded.exp) {
    clearAuthToken();
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

sagaMiddleware.run(rootSaga);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
