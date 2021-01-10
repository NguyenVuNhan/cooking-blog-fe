import React, { FC } from "react";
import { Switch } from "react-router-dom";
import AuthenticatedGuard from "../guards/AuthenticatedGuard";
import AddRecipe from "../pages/Recipes/AddRecipe";
import SearchRecipe from "../pages/Recipes/SearchRecipe";
import ViewRecipe from "../pages/Recipes/ViewRecipe";

const RecipeRoute: FC = () => {
  return (
    <Switch>
      <AuthenticatedGuard exact path="/recipe/add" component={AddRecipe} />
      <AuthenticatedGuard
        exact
        path="/recipe/search(.*)"
        component={SearchRecipe}
      />
      <AuthenticatedGuard exact path="/recipe/:id" component={ViewRecipe} />
    </Switch>
  );
};

export default RecipeRoute;
