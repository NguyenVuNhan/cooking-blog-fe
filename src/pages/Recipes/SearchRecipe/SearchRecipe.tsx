import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";
import { searchRecipe } from "../recipes.actions";
import { useQuery } from "../../../hooks";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import ListRecipe from "../ListRecipe";
import RecipeTemplate from "../../../components/templates/recipe.template";

const SearchRecipe = () => {
  const { register, handleSubmit } = useForm<SearchForm>();
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const q = query.get("q");
    if (q) {
      searchRecipe(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: SearchForm) => {
    searchRecipe(data.data);
    history.replace(`${history.location.pathname}?q=${data.data}`);
  };

  return (
    <RecipeTemplate>
      <Box display="flex" alignItems="center" justifyContent="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
          <InputBase
            placeholder="Search recipe"
            inputProps={{ "aria-label": "Search recipe" }}
            name="data"
            className="border rounded pl-2 w-100 bg-white mt-2"
            inputRef={register}
            endAdornment={
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
            }
          />
        </form>
      </Box>
      <div className="my-3" />
      <ListRecipe />
    </RecipeTemplate>
  );
};

export default SearchRecipe;
