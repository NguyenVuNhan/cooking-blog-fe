import { defer, zip } from "rxjs";
import { map } from "rxjs/operators";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentSnapshot,
} from "@firebase/firestore-types";
import { Recipe } from "../@types/recipe";
import { app, firestore } from "./firebase";

const paginateSize = 20;
const recipesRef = firestore.collection("recipes");
export const toRecipe = (data: QuerySnapshot<Recipe>): Recipe[] =>
  data.docs.map((doc: QueryDocumentSnapshot<Recipe>) => ({
    ...doc.data(),
    id: doc.id,
  }));

export const addRecipe = (recipe: Recipe) => {
  recipe.ingredients = recipe.ingredients.map((ingredient) =>
    ingredient.toLowerCase()
  );
  return defer(() => recipesRef.doc().set(recipe));
};

export const searchRecipe = (data: string) =>
  zip(
    defer(() =>
      recipesRef
        .where("title", ">=", data)
        .where("title", "<=", data + "\uf8ff")
        .get()
    ),
    defer(() =>
      recipesRef
        .where("ingredients", "array-contains", data.toLowerCase())
        .get()
    )
  ).pipe(
    map(([r1, r2]) => [
      ...toRecipe(r1 as QuerySnapshot<Recipe>),
      ...toRecipe(r2 as QuerySnapshot<Recipe>),
    ])
  );

export const getRecipe = (id: string) =>
  defer(() => recipesRef.doc(id).get()).pipe(
    map((recipe) => {
      return { ...(recipe as DocumentSnapshot<Recipe>).data(), id } as Recipe;
    })
  );

export const getRecipeList = () =>
  defer(() => recipesRef.limit(paginateSize).get()).pipe(
    map((data) => toRecipe(data as QuerySnapshot<Recipe>))
  );

export const nextRecipeList = (recipeId: String) =>
  defer(() => recipesRef.startAfter(recipeId).limit(paginateSize).get()).pipe(
    map((data) => toRecipe(data as QuerySnapshot<Recipe>))
  );

export const previousRecipeList = (recipeId: String) =>
  defer(() => recipesRef.endBefore(recipeId).limit(paginateSize).get()).pipe(
    map((data) => toRecipe(data as QuerySnapshot<Recipe>))
  );

export const dummyRecipe = () => {
  const user = app.auth().currentUser;
  if (!user) throw new Error("User not logged in");

  //   console.log(user.uid);
  //   firestore
  //     .collection("recipes")
  //     .doc()
  //     .set({ user: user.uid, test: Math.floor(Date.now() / 1000) })
  //     .then(console.log);

  firestore
    .collection("recipes")
    // .orderBy("test", "desc")
    // .startAfter("VzoHMCz35rjDjI3YJ5SU")
    .get()
    .then((data) => {
      const d = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(d);
    });
};
