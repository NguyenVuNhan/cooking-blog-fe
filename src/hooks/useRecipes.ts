import { useEffect, useState } from "react";
import { Recipe } from "../@types/recipe";
import { recipeState$ } from "../states/recipe.state";

const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const s = recipeState$.subscribe((state) => setRecipes(state.recipeList));

    return () => {
      if (s) s.unsubscribe();
    };
  }, []);

  return recipes;
};

export default useRecipes;
