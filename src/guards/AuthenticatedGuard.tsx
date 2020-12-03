import React, { ComponentType } from "react";
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";

interface Props extends RouteProps {
  isAuthenticated: boolean | undefined;
  component: ComponentType<RouteComponentProps>;
}

const AuthenticatedGuard: React.FC<Props> = ({
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
