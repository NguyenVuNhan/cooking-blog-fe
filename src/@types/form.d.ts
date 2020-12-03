interface SearchForm {
  data: string;
}

interface RecipeForm {
  id?: string;
  title: string;
  owner?: string;
  description?: string;
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
