interface SearchForm {
  data: string;
}

interface RecipeForm {
  title: string;
  steps: RecipeStep[];
  ingredients: Ingredients;
  duration: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  cPassword: string;
}

interface ForgotPasswordForm {
  email: string;
}
