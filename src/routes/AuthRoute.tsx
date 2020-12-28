import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import ForgotPassword from "../pages/Authentication/ForgotPassword";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

const AuthRoutes: FC = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
};

export default AuthRoutes;
