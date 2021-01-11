import GetRecipe from "pages/Recipes/GetRecipe";
import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedGuard from "../guards/AuthenticatedGuard";
import AddRecipe from "../pages/Recipes/AddRecipe";
import SearchRecipe from "../pages/Recipes/SearchRecipe";

const RecipeRoute: FC = () => {
  return (
    <Switch>
      <AuthenticatedGuard exact path="/recipe/add" component={AddRecipe} />
      <Route exact path="/recipe/search(.*)" component={SearchRecipe} />
      <Route exact path="/recipe/:id" component={GetRecipe} />
    </Switch>
  );
};

export default RecipeRoute;
