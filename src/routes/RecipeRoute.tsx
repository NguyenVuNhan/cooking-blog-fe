import React, { FunctionComponent } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../guards/AuthenticatedGuard";
import AddRecipe from "../pages/Recipes/AddRecipe";
import ListRecipe from "../pages/Recipes/ListRecipe";

type Props = {
  isAuthenticated: Boolean | undefined;
};

const RecipeRoute: FunctionComponent<Props> = ({ isAuthenticated }) => {
  return (
    <Switch>
      <AuthenticatedGuard
        isAuthenticated={isAuthenticated}
        exact
        path="/recipe/add"
        component={AddRecipe}
      />
      <AuthenticatedGuard
        isAuthenticated={isAuthenticated}
        exact
        path="/recipe"
        component={ListRecipe}
      />
    </Switch>
  );
};

export default RecipeRoute;
