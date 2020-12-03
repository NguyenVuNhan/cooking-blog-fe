import React, { FunctionComponent } from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { useAuthenticatedStatus } from "../hooks";
import AuthRoutes from "./AuthRoute";
import HomeRoute from "./HomeRoute";
import RecipeRoute from "./RecipeRoute";

const MainRoute: FunctionComponent = () => {
  const auth = useAuthenticatedStatus();

  return (
    <BrowserRouter>
      <AuthRoutes />
      <RecipeRoute isAuthenticated={auth} />
      <HomeRoute />
      {auth && <Redirect to="/" />}
    </BrowserRouter>
  );
};

export default MainRoute;
