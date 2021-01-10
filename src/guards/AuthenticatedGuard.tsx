import React, { ComponentType, FC } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  RouteProps,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import { IRootState } from "reducers";

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps>;
}

const AuthenticatedGuard: FC<Props> = ({
  component: Component,
  ...rest
}: Props) => {
  const isAuthenticated = useSelector<IRootState, boolean>(
    (state) => state.auth.authenticated
  );

  console.log(isAuthenticated);

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
