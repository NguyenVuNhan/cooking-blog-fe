import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { forwardTo } from "helpers/router";
import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { IRootState } from "reducers/rootReducer";

const ListRecipe: FunctionComponent = () => {
  const recipes = useSelector<IRootState, Recipes>(
    (state) => state.recipe.recipes
  );

  const toRecipe = (id: string | undefined) => () => {
    forwardTo(`/recipe/${id}`);
  };

  return (
    <Grid container spacing={3}>
      {recipes.length === 0 ? (
        <Typography variant="h5" align="center" className="w-100 text-muted">
          No result
        </Typography>
      ) : (
        recipes.map((recipe, index) => (
          <Grid
            container
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            alignItems="stretch"
          >
            <Card className="w-100 d-flex flex-column">
              <CardContent>
                <Typography variant="h4">{recipe.title}</Typography>
                <div className="d-flex align-item-center">
                  <AccessTimeIcon className="mr-1" />
                  <Typography>{recipe.duration}</Typography>
                </div>
              </CardContent>
              <div className="flex-grow-1"></div>
              <CardActions>
                <Button onClick={toRecipe(recipe._id)}>View recipe</Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ListRecipe;
