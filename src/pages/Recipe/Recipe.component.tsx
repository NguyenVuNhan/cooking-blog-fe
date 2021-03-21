import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import EditButton from "components/atoms/EditButton";
import EditIngredientModal from "components/organism/EditIngredientModel";
import EditStepGroup from "components/organism/EditStepGroup";
import TimerSnackbar from "components/organism/TimerSnackbar";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import React, { FC, ReactElement, useState } from "react";
import TitleEdit from "./components/TitleEdit";

interface Props {
  isOwner: boolean;
  deleteRecipe: () => void;
  recipe: Recipe;
  updateRecipe: (data: Partial<RecipeForm>) => void;
}

const Recipe: FC<Props> = ({ recipe, isOwner, deleteRecipe, updateRecipe }) => {
  const [ingredientEdit, setIngredientEdit] = useState(false);
  const [stepEdit, setStepEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [timerOpen, setTimerOpen] = React.useState(false);
  const [timeoutOpen, setTimeoutOpen] = React.useState(false);
  const [duration, setDuration] = useState(0);

  const getDuration = (rawDuration: string) => {
    const reg = /(\d*).*\s\s*(\w\w*)$/;
    const result = reg.exec(rawDuration);

    if (result?.length !== 3) return 0;

    const value = parseInt(result[1], 10);
    let multiplier = 0;

    switch (result[2]) {
      case "hour":
      case "hours":
      case "hr":
      case "hrs":
        multiplier = 60 * 60 * 1000;
        break;
      case "min":
      case "mins":
      case "minutes":
      case "minute":
      case "m":
        multiplier = 60 * 1000;
        break;
      case "sec":
      case "seconds":
      case "second":
      case "s":
        multiplier = 1000;
        break;
    }

    return value * multiplier;
  };

  const parseTime = (description: string) => {
    const timeRegex = /(\d\d*\s*(?:-\s*\d\d*\s*)?\w*)/g;
    const result = description.split(timeRegex);

    const ret: (string | ReactElement)[] = [...result];

    for (let i = 1, length = result.length; i < length; i += 2) {
      const d = getDuration(result[i]);
      ret[i] = (
        <Chip
          key={i}
          onClick={startTimer(d)}
          style={{ color: "blue", padding: 0 }}
          label={result[i]}
        />
      );
    }

    return ret;
  };

  const handleClose = () => {
    setTimeoutOpen(false);
  };

  const startTimer = (duration: number) => () => {
    setTimerOpen(false);
    setDuration(duration);
    setTimerOpen(true);
  };

  const closeTimer = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setTimerOpen(false);
    setTimeoutOpen(true);
  };

  return (
    <RecipeFeatureTemplate>
      <EditIngredientModal
        defaultIngredients={recipe.ingredients}
        open={ingredientEdit}
        handleClose={() => setIngredientEdit(false)}
        onUpdate={updateRecipe}
      />

      {timerOpen && (
        <TimerSnackbar
          onClose={closeTimer}
          open={timerOpen}
          duration={duration}
        />
      )}

      <Dialog
        open={timeoutOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setTimeoutOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Time out</AlertTitle>
          Ding Ding Ding
        </Alert>
      </Dialog>

      {!titleEdit ? (
        <>
          <Typography variant="h2" align="center" noWrap>
            {recipe.title}
          </Typography>
          <Typography align="center" noWrap>
            {recipe.duration} - {recipe.steps.length} steps
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
            <p>
              <strong>Description:</strong> {parseTime(step.description)}
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
