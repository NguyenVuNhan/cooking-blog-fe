import AddRecipe from "pages/AddRecipe";
import Recipe from "pages/Recipe";
import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedGuard from "../guards/AuthenticatedGuard";
import Recipes from "../pages/Recipes";

const RecipeRoute: FC = () => {
  return (
    <Switch>
      <AuthenticatedGuard exact path="/recipe/add" component={AddRecipe} />
      <Route exact path="/recipe/search(.*)" component={Recipes} />
      <Route exact path="/recipe/:id" component={Recipe} />
    </Switch>
  );
};

export default RecipeRoute;
