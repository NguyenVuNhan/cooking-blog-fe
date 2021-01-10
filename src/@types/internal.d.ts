/* eslint-disable @typescript-eslint/no-explicit-any */
type Modify<T, R> = Omit<T, keyof R> & R;

type callbackfn = () => void;

interface AnyObject<T = any> {
  [key: string]: T;
}

interface BaseBody<T = any> {
  data: T;
  message: string;
  success: boolean;
}
