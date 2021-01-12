import history from "providers/History";
import React, { FunctionComponent } from "react";
import { Router } from "react-router-dom";
import AuthRoutes from "./AuthRoute";
import HomeRoute from "./HomeRoute";
import RecipeRoute from "./RecipeRoute";

const MainRoute: FunctionComponent = () => {
  return (
    <Router history={history}>
      <RecipeRoute />
      <AuthRoutes />
      <HomeRoute />
    </Router>
  );
};

export default MainRoute;
