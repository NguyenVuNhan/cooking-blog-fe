import { Subject } from "rxjs";
import { map, scan, shareReplay, startWith } from "rxjs/operators";
import { Recipe, RecipeListState } from "../@types/recipe";
import { actionMerge } from "../helpers/rxjs-utils";

const RECIPE_SET_RECIPE = "RECIPE_SET_RECIPE";
const RECIPE_SET_LOADING = "RECIPE_SET_LOADING";
const initialState: RecipeListState = {
  firstInList: undefined,
  recipeList: [],
  lastInList: undefined,
  loading: false,
};

const setRecipes$ = new Subject<Recipe[]>();
export const onSetRecipes$ = (recipes: Recipe[]) => {
  setRecipes$.next(recipes);
};

const setLoading$ = new Subject<Boolean>();
export const onSetLoading = (loading: Boolean) => {
  setLoading$.next(loading);
};

const recipeAction$ = actionMerge({
  RECIPE_SET_RECIPE: setRecipes$.pipe(
    map((recipeList) => ({
      firstInList: recipeList[0].id,
      lastInList: recipeList[recipeList.length - 1].id,
      recipeList,
      loading: false,
    }))
  ),
  RECIPE_SET_LOADING: setLoading$,
});

export const recipeState = recipeAction$.pipe(
  scan((state, action) => {
    switch (action.type) {
      case RECIPE_SET_RECIPE:
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
