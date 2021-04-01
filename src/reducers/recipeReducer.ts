import { searchTypes } from "components/molecules/Search";
import { recipeTypes } from "pages/Recipe";
import { GET_RECIPE_SUCCESS } from "pages/Recipe/Recipe.types";

export interface RecipeState {
  recipes: Recipes;
  recipe?: Recipe;
}

type RecipeActionType =
  | recipeTypes.RecipeActionType
  | searchTypes.SearchActionType;

const initialState: RecipeState = {
  recipes: [],
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
