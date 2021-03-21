import { useRef, useEffect } from "react";

type CallbackType = () => void;

const useTimeout = (timeout: number, callback?: CallbackType): void => {
  const callbackRef = useRef<CallbackType | undefined>(undefined);
  callbackRef.current = callback;

  useEffect(() => {
    if (timeout === null) return;
    const id = setTimeout(
      () => callbackRef.current && callbackRef.current(),
      timeout
    );
    return () => clearTimeout(id);
  }, [timeout]);
};

export default useTimeout;
