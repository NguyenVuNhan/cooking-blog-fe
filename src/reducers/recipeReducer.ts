import { searchTypes } from "components/molecules/Search";
import { getRecipeTypes } from "pages/Recipes/GetRecipe";
import { GET_RECIPE_SUCCESS } from "pages/Recipes/GetRecipe/GetRecipe.types";

export interface RecipeState {
  recipes: Recipes;
  recipe: Recipe | null;
}

type RecipeActionType =
  | getRecipeTypes.GetRecipeActionType
  | searchTypes.SearchActionType;

const initialState: RecipeState = {
  recipes: [],
  recipe: null,
};

const recipeReducer = (
  state = initialState,
  action: RecipeActionType
): RecipeState => {
  switch (action.type) {
    case searchTypes.SEARCH_SUCCESS:
      return { ...state, recipes: action.payload };
    case GET_RECIPE_SUCCESS:
      return { ...state, recipe: action.payload };
    default:
      return state;
  }
};

export default recipeReducer;
