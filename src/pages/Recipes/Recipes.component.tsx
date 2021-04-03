import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Search from "components/molecules/Search";
import ListRecipe from "components/organism/ListRecipe";
import RecipeTemplate from "components/templates/recipe.template";
import React, { FC } from "react";
import { useHistory } from "react-router-dom";

const SearchRecipe: FC = () => {
  const history = useHistory();

  return (
    <RecipeTemplate hideGoBack>
      <Box display="flex" alignItems="center" justifyContent="center">
        <div>
          <Typography align="center" variant="h1">
            Cooking Blog
          </Typography>
          <Search
            onSearch={(query) =>
              history.replace(`${history.location.pathname}${query}`)
            }
          />
        </div>
      </Box>
      <div className="my-3" />
      <ListRecipe />
    </RecipeTemplate>
  );
};

export default SearchRecipe;
