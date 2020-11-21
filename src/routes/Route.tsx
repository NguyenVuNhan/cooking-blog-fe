import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useAuthenticatedStatus } from "../hooks";
import AuthRoutes from "./AuthRoute";
import HomeRoute from "./HomeRoute";
import RecipeRoute from "./RecipeRoute";

const MainRoute = () => {
  const auth = useAuthenticatedStatus();

  return (
    <BrowserRouter>
      <AuthRoutes />
      <RecipeRoute isAuthenticated={auth} />
      <HomeRoute />
    </BrowserRouter>
  );
};

export default MainRoute;
