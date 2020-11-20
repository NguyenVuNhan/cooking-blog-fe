export interface RecipeStep {
  id?: String;
  description: String;
  duration: number;
}

export interface Recipe {
  id?: String;
  title: String;
  owner?: string;
  description?: String;
  steps: RecipeStep[];
  ingredients: String[];
  duration: number;
}

export interface RecipeListState {
  firstInList: String | undefined;
  recipeList: Recipe[];
  lastInList: String | undefined;
  loading: Boolean;
}
