import firebase from "firebase";

type UserCredential = firebase.auth.UserCredential;
type FirebaseError = firebase.FirebaseError;
type DocumentData = firebase.firestore.DocumentData;
type QuerySnapshot<T = DocumentData> = firebase.firestore.QuerySnapshot<T>;
type QueryDocumentSnapshot<
  T = DocumentData
> = firebase.firestore.QueryDocumentSnapshot<T>;
