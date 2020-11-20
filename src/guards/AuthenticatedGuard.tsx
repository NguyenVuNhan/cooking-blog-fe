import React, { ComponentType } from "react";
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";

interface Props extends RouteProps {
  isAuthenticated: Boolean | undefined;
  component: ComponentType<RouteComponentProps>;
}

const AuthenticatedGuard = ({
  component: Component,
  isAuthenticated,
  ...rest
}: Props) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...props} />;
        }

        return <Redirect to="/login" />;
      }}
    />
  );
};

export default AuthenticatedGuard;
