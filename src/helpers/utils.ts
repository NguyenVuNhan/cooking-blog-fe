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
