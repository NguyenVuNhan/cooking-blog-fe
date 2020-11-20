import { defer } from "rxjs";
import { map } from "rxjs/operators";
import { Recipe } from "../@types/recipe";
import { collectionToFields } from "../helpers/firebase-utils";
import { app, firestore } from "./firebase";

const paginateSize = 20;
const recipesRef = firestore.collection("recipes");

export const addRecipe = (recipe: Recipe) =>
  defer(() => recipesRef.doc().set(recipe));

export const getRecipeList = () =>
  defer(recipesRef.limit(paginateSize).get).pipe(map(collectionToFields));

export const nextRecipeList = (recipeId: String) =>
  defer(recipesRef.startAfter(recipeId).limit(paginateSize).get).pipe(
    map(collectionToFields)
  );

export const previousRecipeList = (recipeId: String) =>
  defer(recipesRef.endBefore(recipeId).limit(paginateSize).get).pipe(
    map(collectionToFields)
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
