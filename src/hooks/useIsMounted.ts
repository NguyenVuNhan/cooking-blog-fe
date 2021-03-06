import { useEffect, useRef } from "react";

const useIsMounted = (): boolean => {
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
};

export default useIsMounted;
