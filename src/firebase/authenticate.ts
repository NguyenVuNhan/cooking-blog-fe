import { defer, Observable } from "rxjs";
import { auth } from "./firebase";
import { UserCredential } from "../@types/external";

/**
 * Create account using email and password
 *
 * @param email User's email address
 * @param password User's password
 */
export const signUp = (
  email: string,
  password: string
): Observable<UserCredential> =>
  defer(() => auth.createUserWithEmailAndPassword(email, password));

/**
 * User Sign in with email and password
 *
 * @param email User's email address
 * @param password User's password
 */
export const signIn = (
  email: string,
  password: string
): Observable<UserCredential> =>
  defer(() => auth.signInWithEmailAndPassword(email, password));

/**
 * Sign out user
 */
export const signOut = (): Observable<void> => defer(auth.signOut);
