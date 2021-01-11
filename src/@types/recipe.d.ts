interface RecipeStep {
  ingredients: string[];
  description: string;
  duration: string;
}
type RecipeSteps = RecipeStep[];

interface Ingredient {
  ingredient: string;
  quantity: string;
}
type Ingredients = Ingredient[];

interface Recipe {
  _id?: string;
  title: string;
  duration: string;
  user: string;
  steps: RecipeSteps;
  ingredients: Ingredients;
}
type Recipes = Recipe[];
