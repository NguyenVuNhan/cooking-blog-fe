import axios from "axios";

export type SearchResponseData = BaseBody<{ recipes: Recipes }>;
export const search = async (_query: string): Promise<SearchResponseData> => {
  // TODO: change to search recipe
  const res = await axios.get<SearchResponseData>("/api/recipe");
  return res.data;
};

export type GetRecipeResponseData = BaseBody<{
  recipes: Omit<Recipe, "ingredients"> & {
    ingredients: (Omit<Ingredient, "ingredient"> & {
      ingredient: {
        name: string;
      };
    })[];
  };
}>;
export const getRecipe = async (id: string): Promise<GetRecipeResponseData> => {
  const res = await axios.get<GetRecipeResponseData>(`/api/recipe/${id}`);
  return res.data;
};

export type AddRecipeResponseData = BaseBody;
export const addRecipe = async (
  data: RecipeForm
): Promise<AddRecipeResponseData> => {
  const res = await axios.post<AddRecipeResponseData>(`/api/recipe`, data);
  return res.data;
};
