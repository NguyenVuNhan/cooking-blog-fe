import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import { getRecipe } from "firebase/recipe";
import { useUserInfo } from "hooks";

interface ParamTypes {
  id: string;
}

const ViewRecipe: FunctionComponent = () => {
  const { id } = useParams<ParamTypes>();
  const [recipe, setRecipe] = useState<Recipe>();
  const user = useUserInfo();

  useEffect(() => {
    const s = getRecipe(id).subscribe(setRecipe);

    return () => {
      s.unsubscribe();
    };
  }, [id]);

  return !recipe ? (
    <div>Loading...</div>
  ) : (
    <RecipeFeatureTemplate>
      <Typography variant="h2" align="center" noWrap>
        {recipe.title}
      </Typography>
      <Typography align="center" noWrap>
        {recipe.duration} min - {recipe.steps.length} steps
      </Typography>
      <Typography variant="h4" align="left" noWrap>
        Description
      </Typography>
      <Typography align="left" noWrap>
        {recipe.description ? "No description available" : recipe.description}
      </Typography>
      <Typography variant="h4" align="left" noWrap>
        Ingredients
      </Typography>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            <p>
              {ingredient.name} {ingredient.amount}
            </p>
          </li>
        ))}
      </ul>
      <Typography variant="h4" align="left" noWrap>
        Steps
      </Typography>
      {recipe.steps.map((step, index) => (
        <React.Fragment key={index}>
          <Typography variant="h6" align="left" noWrap>
            Step {index + 1}:
          </Typography>
          <p className="font-weight-bold">
            Ingredients
            {step.ingredients.map((ingredient, index) => (
              <Chip
                key={index}
                className="ml-1"
                size="small"
                color="primary"
                component="span"
                label={ingredient}
              />
            ))}
          </p>
          <p className="font-weight-bold">Description</p>
          <p>{step.description}</p>
        </React.Fragment>
      ))}

      {user?.uid === recipe.owner && (
        <div className="w-100 d-flex justify-content-center">
          <Button variant="contained" color="secondary">
            Delete
          </Button>
        </div>
      )}
    </RecipeFeatureTemplate>
  );
};

export default ViewRecipe;
