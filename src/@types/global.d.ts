declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }

  interface MyToken {
    exp: number;
  }
}

export {};
