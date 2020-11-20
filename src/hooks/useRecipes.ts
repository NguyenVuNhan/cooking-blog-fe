import { useEffect, useState } from "react";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {}, []);

  return recipes;
};
