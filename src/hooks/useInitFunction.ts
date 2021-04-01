import { useEffect } from "react";

const useInitFunction = <Fn extends (...args: unknown[]) => void>(
  fn: Fn,
  ...args: Parameters<Fn>
): void => {
  useEffect(() => {
    fn(...args);
  }, [fn, ...args]);
};

export default useInitFunction;
