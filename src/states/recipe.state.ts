import { Subject } from "rxjs";
import { map, scan, shareReplay, startWith } from "rxjs/operators";
import { actionMerge } from "../helpers/rxjs-utils";

const RECIPE_SET_RECIPE = "RECIPE_SET_RECIPE";
const RECIPE_SET_RECIPES = "RECIPE_SET_RECIPES";
const RECIPE_SET_LOADING = "RECIPE_SET_LOADING";
const initialState: RecipeListState = {
  firstInList: undefined,
  recipeList: [],
  lastInList: undefined,
  currentRecipe: undefined,
  loading: false,
};

const setRecipe$ = new Subject<Recipe>();
export const onSetRecipe = (recipe: Recipe): void => {
  setRecipe$.next(recipe);
};

const setRecipeList$ = new Subject<Recipe[]>();
export const onSetRecipeList = (recipes: Recipes): void => {
  setRecipeList$.next(recipes);
};

const setLoading$ = new Subject<boolean>();
export const onSetLoading = (loading: boolean): void => {
  setLoading$.next(loading);
};

const recipeAction$ = actionMerge({
  RECIPE_SET_RECIPE: setRecipe$,
  RECIPE_SET_RECIPES: setRecipeList$.pipe(
    map((recipeList) => ({
      firstInList: recipeList[0]?.id,
      lastInList: recipeList[recipeList.length - 1]?.id,
      recipeList,
      loading: false,
    }))
  ),
  RECIPE_SET_LOADING: setLoading$,
});

export const recipeState$ = recipeAction$.pipe(
  scan((state, action) => {
    switch (action.type) {
      case RECIPE_SET_RECIPE:
        return { ...state, currentRecipe: action.payload };
      case RECIPE_SET_RECIPES:
        return { ...state, ...action.payload };
      case RECIPE_SET_LOADING:
        return { ...state, loading: action.payload };
      default:
        return state;
    }
  }, initialState),
  startWith(initialState),
  shareReplay(1)
);
