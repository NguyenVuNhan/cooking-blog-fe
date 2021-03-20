declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }

  interface MyToken extends IUser {
    id: string;
    exp: number;
  }
}

export {};
