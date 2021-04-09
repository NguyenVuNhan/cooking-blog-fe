export const unique = <T = undefined>(arr: T[], f: (e: T) => string): T[] => {
  const seen: AnyObject<number> = {};
  const out: T[] = [];
  const len = arr.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = f(arr[i]);
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = arr[i];
    }
  }
  return out;
};

export const debounce = <Fn extends (...args: never[]) => void>(
  func: Fn,
  delay: number
): ((...rest: Parameters<Fn>) => void) => {
  let inDebounce: NodeJS.Timeout;
  return function (...rest) {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...rest), delay);
  };
};

export const throttle = <Fn extends (...args: never[]) => void>(
  func: Fn,
  limit: number
): ((...rest: Parameters<Fn>) => void) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return function (...rest) {
    if (!lastRan) {
      func(...rest);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func(...rest);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};
