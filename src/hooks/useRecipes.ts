import { useEffect, useState } from "react";
import { recipeState$ } from "../states/recipe.state";

const useRecipes = (): Recipes => {
  const [recipes, setRecipes] = useState<Recipes>([]);

  useEffect(() => {
    const s = recipeState$.subscribe((state) => setRecipes(state.recipeList));

    return () => {
      if (s) s.unsubscribe();
    };
  }, []);

  return recipes;
};

export default useRecipes;
