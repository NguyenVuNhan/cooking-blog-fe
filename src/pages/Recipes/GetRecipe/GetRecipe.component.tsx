import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import React, { FC } from "react";

interface Props {
  recipe: Recipe;
}

const ViewRecipe: FC<Props> = ({ recipe }) => {
  return (
    <RecipeFeatureTemplate>
      <Typography variant="h2" align="center" noWrap>
        {recipe.title}
      </Typography>
      <Typography align="center" noWrap>
        {recipe.duration} min - {recipe.steps.length} steps
      </Typography>
      <Typography variant="h4" align="left" noWrap>
        Ingredients
      </Typography>
      <ul>
        {recipe.ingredients.map((value, index) => (
          <li key={index}>
            <p>
              {value.ingredient} {value.quantity}
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

      {/* {user?.uid === recipe.owner && ( */}
      {/*   <div className="w-100 d-flex justify-content-center"> */}
      {/*     <Button variant="contained" color="secondary"> */}
      {/*       Delete */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* )} */}
    </RecipeFeatureTemplate>
  );
};

export default ViewRecipe;
