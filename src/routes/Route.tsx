import React, { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import AuthRoutes from "./AuthRoute";
import HomeRoute from "./HomeRoute";
import RecipeRoute from "./RecipeRoute";

const MainRoute: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <RecipeRoute />
      <AuthRoutes />
      <HomeRoute />
    </BrowserRouter>
  );
};

export default MainRoute;
