import { defer, Observable, zip } from "rxjs";
import { map } from "rxjs/operators";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentSnapshot,
} from "@firebase/firestore-types";
import { firestore } from "./firebase";
import { unique } from "../helpers/utils";

const paginateSize = 20;
const recipesRef = firestore.collection("recipes");
const ingredientsRef = firestore.collection("ingredients");

export const toRecipe = (data: QuerySnapshot<Recipe>): Recipes =>
  data.docs.map((doc: QueryDocumentSnapshot<Recipe>) => ({
    ...doc.data(),
    id: doc.id,
  }));

export const addRecipe = (recipe: Recipe): Observable<void[]> => {
  recipe.ingredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    name: ingredient.name.toLowerCase(),
  }));
  return zip(
    recipesRef.doc().set(recipe),
    ...recipe.ingredients.map((ingredient) =>
      ingredientsRef.doc(ingredient.name).set({}, { merge: true })
    )
  );
};

export const searchRecipe = (data: string): Observable<Recipes> =>
  zip(
    defer(() =>
      recipesRef
        .where("title", ">=", data.toUpperCase())
        .where("title", "<=", data.toUpperCase() + "\uf8ff")
        .get()
    ),
    defer(() =>
      recipesRef
        .where("ingredients", "array-contains", data.toLowerCase())
        .get()
    )
  ).pipe(
    map(([r1, r2]) =>
      unique(
        [
          ...toRecipe(r1 as QuerySnapshot<Recipe>),
          ...toRecipe(r2 as QuerySnapshot<Recipe>),
        ],
        (recipe) => (recipe.id ? recipe.id : "")
      )
    )
  );

export const getRecipe = (id: string): Observable<Recipe> =>
  defer(() => recipesRef.doc(id).get()).pipe(
    map((recipe) => {
      return { ...(recipe as DocumentSnapshot<Recipe>).data(), id } as Recipe;
    })
  );

export const getRecipeList = (): Observable<Recipes> =>
  defer(() => recipesRef.limit(paginateSize).get()).pipe(
    map((data) => toRecipe(data as QuerySnapshot<Recipe>))
  );

export const nextRecipeList = (recipeId: string): Observable<Recipes> =>
  defer(() => recipesRef.startAfter(recipeId).limit(paginateSize).get()).pipe(
    map((data) => toRecipe(data as QuerySnapshot<Recipe>))
  );

export const previousRecipeList = (recipeId: string): Observable<Recipes> =>
  defer(() => recipesRef.endBefore(recipeId).limit(paginateSize).get()).pipe(
    map((data) => toRecipe(data as QuerySnapshot<Recipe>))
  );
