import * as auth from "../../firebase/authenticate";
import {
  onSetAuthenticated,
  onSetError,
  onSetLoading,
  onSetUser,
} from "../../states/auth.state";

export const signUp = (email: string, password: string, cb?: callbackfn) => {
  onSetLoading(true);
  auth.signUp(email, password).subscribe(onSetUser, onSetError, cb);
};

export const signIn = (
  email: string,
  password: string,
  cb: callbackfn = () => {}
) => {
  onSetLoading(true);
  auth.signIn(email, password).subscribe(onSetUser, onSetError, () => {
    onSetAuthenticated(true);
    cb();
  });
};

export const signOut = (cb: callbackfn = () => {}) => {
  onSetLoading(true);
  auth.signOut().subscribe(
    (_res) => onSetUser(null),
    onSetError,
    () => {
      onSetAuthenticated(false);
      cb();
    }
  );
};
