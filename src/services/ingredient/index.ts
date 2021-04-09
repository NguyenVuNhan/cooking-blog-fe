import axios from "axios";

export type GetIngredientsRes = BaseBody<{
  ingredients: string[];
}>;
export const getIngredients = async (
  name: string
): Promise<GetIngredientsRes> => {
  const res = await axios.get<GetIngredientsRes>(
    `/api/ingredients/${name.replaceAll("/", "%2F")}`
  );
  return res.data;
};
