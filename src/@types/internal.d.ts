type Modify<T, R> = Omit<T, keyof R> & R;

type callbackfn = () => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AnyObject<T = any> {
  [key: string]: T;
}
