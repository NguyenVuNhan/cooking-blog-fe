import { useEffect, useState } from "react";
import { map } from "rxjs/operators";
import { authState$ } from "../states/auth.state";

const useAuthenticatedStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>();

  useEffect(() => {
    const s = authState$
      .pipe(map((state) => state.isAuthenticated))
      .subscribe(setIsAuthenticated);
    return () => s.unsubscribe();
  }, []);

  return isAuthenticated;
};

export default useAuthenticatedStatus;
