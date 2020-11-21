import { Recipe } from "../../@types/recipe";
import { onSetLoading, onSetRecipeList } from "../../states/recipe.state";
import * as recipeApi from "../../firebase/recipe";

export const searchRecipe = (query: string) => {
  onSetLoading(true);
  console.log(query);
  recipeApi.searchRecipe(query).subscribe((data) => {
    onSetRecipeList(data);
  });
};

export const addRecipe = (recipe: Recipe, cb?: callbackfn) => {
  onSetLoading(true);
  recipeApi.addRecipe(recipe).subscribe(
    (_) => {
      onSetLoading(false);
    },
    (_) => {
      onSetLoading(false);
    },
    cb
  );
};

export const getListRecipes = (cb?: callbackfn) => {
  onSetLoading(true);
  recipeApi.getRecipeList().subscribe(
    (_) => {
      onSetLoading(false);
    },
    (_) => {
      onSetLoading(false);
    },
    cb
  );
};
