import history from "providers/History";

export const forwardTo = (location: string): void => {
  history.push(location);
};

export const toLogin = (): void => {
  forwardTo("/login");
};
