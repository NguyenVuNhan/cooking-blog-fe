import { onSetLoading, onSetRecipeList } from "../../states/recipe.state";
import * as recipeApi from "../../firebase/recipe";

export const searchRecipe = (query: string): void => {
  onSetLoading(true);
  recipeApi.searchRecipe(query).subscribe((data) => {
    onSetRecipeList(data);
  });
};

export const addRecipe = (recipe: Recipe, cb?: callbackfn): void => {
  onSetLoading(true);
  recipeApi.addRecipe(recipe).subscribe(cb);
};

export const getListRecipes = (cb?: callbackfn): void => {
  onSetLoading(true);
  recipeApi.getRecipeList().subscribe(cb);
};
