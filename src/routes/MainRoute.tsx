import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { useAuthenticatedStatus } from "../hooks";
import AuthRoutes from "./AuthRoute";
import RecipeRoute from "./RecipeRoute";

const MainRoute = () => {
  const auth = useAuthenticatedStatus();

  return (
    <BrowserRouter>
      <AuthRoutes />
      <RecipeRoute isAuthenticated={auth} />
      {!auth ? <Redirect to="/login" /> : <Redirect to="/recipe" />}
    </BrowserRouter>
  );
};

export default MainRoute;
