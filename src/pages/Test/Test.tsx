import React from "react";
import { merge, of, Subject } from "rxjs";
import { delay, mapTo, switchMap } from "rxjs/operators";
import { actionMerge } from "../../helpers/rxjs-utils";

const login = (_email: string, _password: string) =>
  of(1).pipe(delay(1000), mapTo({ user: "John Doe" }));
const logout = () => of(1).pipe(delay(500), mapTo({}));

const loginAction$ = new Subject<LoginForm>();
const onLoginAction = (email: string, password: string) => {
  loginAction$.next({ email, password });
};

const logoutAction$ = new Subject<void>();
const onLogoutAction = () => logoutAction$.next();

const authAction$ = actionMerge({
  login: loginAction$.pipe(
    switchMap(({ email, password }) =>
      merge(of({ loading: true }), login(email, password))
    )
  ),
  logout: logoutAction$.pipe(
    switchMap(() => merge(of({ loading: true }), logout()))
  ),
});

const LoginBtn = () => {
  return (
    <>
      <button onClick={() => onLoginAction("email", "password")}>Login</button>
      <button onClick={onLogoutAction}>Logout</button>
    </>
  );
};

const Test = () => {
  React.useEffect(() => {
    const subscriber = authAction$.subscribe(console.log);
    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  return (
    <>
      <LoginBtn />
      <br />
      User
    </>
  );
};

export default Test;
