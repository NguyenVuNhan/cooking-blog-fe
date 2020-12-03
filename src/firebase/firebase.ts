import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "../providers/local.provider";
import { onSetAuthenticated, onSetUser } from "../states/auth.state";

export const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
auth.onAuthStateChanged((data) => {
  onSetUser({ credential: null, user: data });
  onSetAuthenticated(data ? true : false);
});

export const firestore = firebase.firestore();
