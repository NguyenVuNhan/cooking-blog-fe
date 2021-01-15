import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import React, { FC, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import EditIngredientModel from "components/organism/EditIngredientModel";

interface Props {
  isOwner: boolean;
  deleteRecipe: () => void;
  recipe: Recipe;
  updateRecipe: (data: Partial<RecipeForm>) => void;
}

const Recipe: FC<Props> = ({ recipe, isOwner, deleteRecipe, updateRecipe }) => {
  const [ingredientModalOpen, setIngredientModalOpen] = useState<boolean>(
    false
  );

  return (
    <RecipeFeatureTemplate>
      <EditIngredientModel
        defaultIngredients={recipe.ingredients}
        open={ingredientModalOpen}
        handleClose={() => setIngredientModalOpen(false)}
        onUpdate={updateRecipe}
      />
      <Typography variant="h2" align="center" noWrap>
        {recipe.title}
      </Typography>
      <Typography align="center" noWrap>
        {recipe.duration} min - {recipe.steps.length} steps
      </Typography>
      <Typography variant="h4" align="left" noWrap>
        Ingredients
        {isOwner && (
          <span>
            <IconButton
              size="small"
              onClick={() => setIngredientModalOpen(true)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </span>
        )}
      </Typography>
      <ul>
        {recipe.ingredients.map((value, index) => (
          <li key={index}>
            <p>
              {value.ingredient} - {value.quantity}
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
            Step {index + 1}:{" "}
            <span>
              <IconButton size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </span>
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

      {isOwner && (
        <div className="w-100 d-flex justify-content-center">
          <Button variant="contained" color="secondary" onClick={deleteRecipe}>
            Delete
          </Button>
        </div>
      )}
    </RecipeFeatureTemplate>
  );
};

export default Recipe;
