import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Recipe } from "../../../@types/recipe";
import { getRecipe } from "../../../firebase/recipe";

interface ParamTypes {
  id: string;
}

const ViewRecipe = () => {
  const history = useHistory();
  const { id } = useParams<ParamTypes>();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const s = getRecipe(id).subscribe(setRecipe);

    return () => {
      s.unsubscribe();
    };
  }, [id]);

  const goBack = () => {
    history.goBack();
  };

  return !recipe ? (
    <div>Loading...</div>
  ) : (
    <div>
      <IconButton onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
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
            <p>{ingredient}</p>
          </li>
        ))}
      </ul>
      <Typography variant="h4" align="left" noWrap>
        Steps
      </Typography>
      {recipe.steps.map((step, index) => (
        <React.Fragment key={index}>
          <Typography variant="h6" align="left" noWrap>
            Step {index + 1} - {step.duration} min:
          </Typography>
          <p>{step.description}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ViewRecipe;
