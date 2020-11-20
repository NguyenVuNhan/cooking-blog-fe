import { Recipe } from "../../@types/recipe";
import { onSetLoading } from "../../states/recipe.state";
import * as recipeApi from "../../firebase/recipe";

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

// export const getListRecipes = cb;
