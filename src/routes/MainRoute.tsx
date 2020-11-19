import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import AuthRoutes from "./AuthRoute";

const MainRoute = () => {
  const auth = false;

  return (
    <BrowserRouter>
      <AuthRoutes />
      {!auth ? <Redirect to="/login" /> : <Redirect to="/" />}
    </BrowserRouter>
  );
};

export default MainRoute;
