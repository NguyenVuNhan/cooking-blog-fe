import { useEffect, useState } from "react";
import { map } from "rxjs/operators";
import { authState$ } from "../states/auth.state";

const useAuthenticatedStatus = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const s = authState$
      .pipe(map((state) => state.isAuthenticated))
      .subscribe(setIsAuthenticated);
    return () => {
      s.unsubscribe();
    };
  }, []);

  return isAuthenticated;
};

export default useAuthenticatedStatus;
