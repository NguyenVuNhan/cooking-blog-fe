import { User } from "@firebase/auth-types";
import { useEffect, useState } from "react";
import { map } from "rxjs/operators";
import { authState$ } from "../states/auth.state";

const useUserInfo = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const s = authState$.pipe(map((state) => state.user)).subscribe(setUser);

    return () => {
      s.unsubscribe();
    };
  }, [setUser]);

  return user;
};

export default useUserInfo;
