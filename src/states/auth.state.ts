import { Subject } from "rxjs";
import { map, scan, shareReplay, startWith } from "rxjs/operators";
import { FirebaseError, UserCredential } from "../@types/external";
import { actionMerge } from "../helpers/rxjs-utils";

export interface UserCredentialState extends UserCredential {
  loading: Boolean;
  isAuthenticated: Boolean;
  error: FirebaseError | null;
}

const AUTH_SET_USER = "AUTH_SET_USER";
const AUTH_SET_LOADING = "AUTH_SET_LOADING";
const AUTH_SET_AUTHENTICATE = "AUTH_SET_AUTHENTICATE";
const AUTH_SET_ERROR = "AUTH_SET_ERROR";
const nullUser: UserCredential = {
  additionalUserInfo: null,
  credential: null,
  operationType: null,
  user: null,
};
const initialState: UserCredentialState = {
  ...nullUser,
  loading: false,
  isAuthenticated: false,
  error: null,
};

const setUser$ = new Subject<UserCredential>();
export const onSetUser = (user: UserCredential | null) => {
  setUser$.next(user === null ? nullUser : user);
};

const setLoading$ = new Subject<Boolean>();
export const onSetLoading = (loading: Boolean) => {
  setLoading$.next(loading);
};

const setAuthenticated$ = new Subject<Boolean>();
export const onSetAuthenticated = (isAuthenticated: Boolean) => {
  setAuthenticated$.next(isAuthenticated);
};

const setError$ = new Subject<FirebaseError | null>();
export const onSetError = (error: FirebaseError | null) => {
  setError$.next(error);
};

const authAction$ = actionMerge({
  AUTH_SET_USER: setUser$.pipe(
    map((user) => ({
      ...user,
      loading: false,
    }))
  ),
  AUTH_SET_AUTHENTICATE: setAuthenticated$.pipe(
    map((isAuthenticated) => isAuthenticated)
  ),
  AUTH_SET_LOADING: setLoading$,
  AUTH_SET_ERROR: setError$.pipe(map((error) => ({ loaded: false, error }))),
});

export const authState$ = authAction$.pipe(
  scan((state, action) => {
    switch (action.type) {
      case AUTH_SET_LOADING:
        return { ...state, loading: action.payload };
      case AUTH_SET_USER:
        console.log(action.payload.user?.uid);
        return { ...state, ...action.payload };
      case AUTH_SET_AUTHENTICATE:
        return { ...state, isAuthenticated: action.payload };
      case AUTH_SET_ERROR:
        return { ...state, ...action.payload };
      default:
        return state;
    }
  }, initialState),
  startWith(initialState),
  shareReplay(1)
);
