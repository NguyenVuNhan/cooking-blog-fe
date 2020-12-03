interface RecipeStep {
  id?: string;
  description: string;
  ingredients: string[];
}
type RecipeSteps = RecipeStep[];

interface Ingredient {
  name: string;
  amount: string;
}
type Ingredients = Ingredient[];

interface Recipe {
  id?: string;
  title: string;
  owner?: string;
  description?: string;
  steps: RecipeSteps;
  ingredients: Ingredients;
  duration: string;
}

type Recipes = Recipe[];

interface RecipeListState {
  firstInList: string | undefined;
  recipeList: Recipes;
  lastInList: string | undefined;
  currentRecipe: Recipe | undefined;
  loading: boolean;
}
