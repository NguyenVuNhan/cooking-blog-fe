import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedGuard from "../guards/AuthenticatedGuard";
import AddRecipe from "../pages/Recipes/AddRecipe";
import SearchRecipe from "../pages/Recipes/SearchRecipe";
import ViewRecipe from "../pages/Recipes/ViewRecipe";

interface Props {
  isAuthenticated: boolean | undefined;
}

const RecipeRoute: FunctionComponent<Props> = ({ isAuthenticated }) => {
  return (
    <Switch>
      <AuthenticatedGuard
        isAuthenticated={isAuthenticated}
        exact
        path="/recipe/add"
        component={AddRecipe}
      />
      <Route
        isAuthenticated={isAuthenticated}
        exact
        path="/recipe/search(.*)"
        component={SearchRecipe}
      />
      <Route
        isAuthenticated={isAuthenticated}
        exact
        path="/recipe/:id"
        component={ViewRecipe}
      />
    </Switch>
  );
};

export default RecipeRoute;
