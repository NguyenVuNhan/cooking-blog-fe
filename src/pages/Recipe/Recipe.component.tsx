import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import EditButton from "components/atoms/EditButton";
import EditIngredientModal from "components/organism/EditIngredientModel";
import EditStepGroup from "components/organism/EditStepGroup";
import TimerSnackbar from "components/organism/TimerSnackbar";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import { extractDuration } from "helpers";
import { useInitFunction } from "hooks";
import React, { FC, useState } from "react";
import TitleEdit from "./components/TitleEdit";
import ToShoppingButton from "./components/ToShoppingButton";
import { Props } from "./Recipe.container";
import useStyle from "./Recipe.style";

const Recipe: FC<Props> = ({
  recipe,
  isOwner,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  loading,
}) => {
  useInitFunction(getRecipe);
  const classes = useStyle();

  const [ingredientEdit, setIngredientEdit] = useState(false);
  const [stepEdit, setStepEdit] = useState(false);
  const [titleEdit, setTitleEdit] = useState(false);
  const [timerOpen, setTimerOpen] = React.useState(false);
  const [timeoutOpen, setTimeoutOpen] = React.useState(false);
  const [duration, setDuration] = useState(0);

  if (loading) return <div>Loading...</div>;

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
    if (reason === "timeout") {
      setTimeoutOpen(true);
    }
  };

  return (
    <RecipeFeatureTemplate>
      <EditIngredientModal
        defaultIngredients={(recipe as Recipe).ingredients}
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
            <Box fontWeight="fontWeightBold" pb={2}>
              {recipe?.title}
            </Box>
          </Typography>
          <Typography align="center" noWrap>
            {recipe?.ingredients.length} ingredients - {recipe?.duration} -{" "}
            {recipe?.steps.length} steps
            <EditButton
              show={isOwner && !ingredientEdit}
              onClick={() => setTitleEdit(true)}
            />
          </Typography>
        </>
      ) : (
        <TitleEdit
          data={recipe as Recipe}
          onUpdate={updateRecipe}
          handleClose={() => setTitleEdit(false)}
        />
      )}
      <Divider variant="middle" className={classes.divider} />

      {/* Ingredient */}
      <Typography variant="h5" align="left" noWrap>
        <Box fontWeight={500}>
          Ingredients
          <EditButton
            show={isOwner && !ingredientEdit}
            onClick={() => setIngredientEdit(true)}
          />
        </Box>
      </Typography>
      <List>
        {recipe?.ingredients.map((value, index) => (
          <ListItem key={index} className={classes.ingredientItem}>
            <ListItemIcon>
              <ToShoppingButton />
            </ListItemIcon>
            <Typography>
              {value.quantity ? value.quantity + " of " : ""}{" "}
              <strong>{value.ingredient}</strong>
            </Typography>
          </ListItem>
        ))}
      </List>

      {/* Steps */}
      {!stepEdit ? (
        recipe?.steps.map((step, index) => (
          <>
            <Divider variant="middle" className={classes.divider} />
            <Box key={index} py={2}>
              <Typography variant="h5" align="left" noWrap>
                <Box fontWeight={500}>Step {index + 1}:</Box>
              </Typography>
              <p>
                <Box component="span" fontWeight={450}>
                  Ingredients:{" "}
                </Box>
                {step.ingredients.join(", ")}
              </p>
              <div>
                <strong>Description:</strong>{" "}
                {extractDuration(step.description, (a, d, i) => (
                  <Chip
                    key={i}
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.chip}
                    onClick={startTimer(d)}
                    label={a.trim()}
                  />
                ))}
              </div>
            </Box>
          </>
        ))
      ) : (
        <EditStepGroup
          recipe={recipe as Recipe}
          onUpdate={updateRecipe}
          handleClose={() => setStepEdit(false)}
        />
      )}

      {isOwner && !stepEdit && (
        <Box display="flex" justifyContent="center">
          <Box px={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setStepEdit(true)}
            >
              Edit Steps
            </Button>
          </Box>
          <Box px={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteRecipe}
            >
              Delete
            </Button>
          </Box>
        </Box>
      )}
    </RecipeFeatureTemplate>
  );
};

export default Recipe;
