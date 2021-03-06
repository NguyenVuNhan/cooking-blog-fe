import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";

const HomeRoute: FC = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default HomeRoute;
