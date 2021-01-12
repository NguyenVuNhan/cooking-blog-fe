import history from "providers/History";

export const forwardTo = (location: string) => {
  history.push(location);
};

export const toLogin = () => {
  forwardTo("/login");
};
