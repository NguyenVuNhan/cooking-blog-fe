import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import EditButton from "components/atoms/EditButton";
import EditIngredientModal from "components/organism/EditIngredientModel";
import EditStepGroup from "components/organism/EditStepGroup";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import React, { FC, useState } from "react";
import { register } from "services/auth";
import TitleEdit from "./components/TitleEdit";

interface Props {
  isOwner: boolean;
  deleteRecipe: () => void;
  recipe: Recipe;
  updateRecipe: (data: Partial<RecipeForm>) => void;
}

const Recipe: FC<Props> = ({ recipe, isOwner, deleteRecipe, updateRecipe }) => {
  const [ingredientEdit, setIngredientEdit] = useState<boolean>(false);
  const [stepEdit, setStepEdit] = useState<boolean>(false);
  const [titleEdit, setTitleEdit] = useState<boolean>(false);

  return (
    <RecipeFeatureTemplate>
      <EditIngredientModal
        defaultIngredients={recipe.ingredients}
        open={ingredientEdit}
        handleClose={() => setIngredientEdit(false)}
        onUpdate={updateRecipe}
      />
      {!titleEdit ? (
        <>
          <Typography variant="h2" align="center" noWrap>
            {recipe.title}
          </Typography>
          <Typography align="center" noWrap>
            {recipe.duration} min - {recipe.steps.length} steps
            <EditButton
              show={isOwner && !ingredientEdit}
              onClick={() => setTitleEdit(true)}
            />
          </Typography>
        </>
      ) : (
        <TitleEdit
          data={recipe}
          onUpdate={updateRecipe}
          handleClose={() => setTitleEdit(false)}
        />
      )}

      <Typography variant="h4" align="left" noWrap>
        Ingredients
        <EditButton
          show={isOwner && !ingredientEdit}
          onClick={() => setIngredientEdit(true)}
        />
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
        <EditButton
          show={isOwner && !stepEdit}
          onClick={() => setStepEdit(true)}
        />
      </Typography>
      {stepEdit ? (
        <EditStepGroup
          recipe={recipe}
          onUpdate={updateRecipe}
          handleClose={() => setStepEdit(false)}
        />
      ) : (
        recipe.steps.map((step, index) => (
          <React.Fragment key={index}>
            <Typography variant="h6" align="left" noWrap>
              Step {index + 1}:
            </Typography>
            <p className="font-weight-bold">
              <strong>Ingredients:</strong>
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
            <p className="font-weight-bold">
              <strong>Description:</strong> {step.description}
            </p>
          </React.Fragment>
        ))
      )}
      {isOwner && !stepEdit && (
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
