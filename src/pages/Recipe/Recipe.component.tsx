import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import EditButton from "components/atoms/EditButton";
import EditIngredientModal from "components/organism/EditIngredientModel";
import EditStepGroup from "components/organism/EditStepGroup";
import TimerSnackbar from "components/organism/TimerSnackbar";
import RecipeTemplate from "components/templates/recipe.template";
import { extractDuration } from "helpers";
import { useInitFunction } from "hooks";
import React, { FC, Fragment, useContext, useState } from "react";
import TitleEdit from "./components/TitleEdit";
import ToShoppingButton from "./components/ToShoppingButton";
import { Props } from "./Recipe.container";
import useStyle from "./Recipe.style";
import { ShoppingListCtx } from "providers/ShoppingListProvider";

const Recipe: FC<Props> = ({
  recipe,
  isOwner,
  getRecipe,
  deleteRecipe,
  updateRecipe,
  loading,
}) => {
  useInitFunction(getRecipe);
  const { addAllToShoppingList, addOneToShoppingList } = useContext(
    ShoppingListCtx
  );
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
    <RecipeTemplate>
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
      <Divider variant="middle" className="my-1" />

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
        {recipe?.ingredients.map(({ ingredient, quantity }, index) => (
          <ListItem key={index} className={classes.ingredientItem}>
            <ListItemIcon>
              <ToShoppingButton
                onSelect={() =>
                  addOneToShoppingList(ingredient, recipe.title, quantity)
                }
              />
            </ListItemIcon>
            <Typography>
              {quantity ? quantity + " of " : ""}{" "}
              <Box component="span" fontWeight={401}>
                {ingredient}
              </Box>
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center">
        <Button
          color="primary"
          startIcon={<AddShoppingCartIcon />}
          className="normal-case"
          onClick={() => recipe && addAllToShoppingList(recipe)}
        >
          Add all to shopping list
        </Button>
      </Box>

      {/* Steps */}
      {!stepEdit ? (
        recipe?.steps.map((step, index) => (
          <Fragment key={index}>
            <Divider variant="middle" className="my-1" />
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
              <Box lineHeight={2}>
                <strong>Description:</strong>
                {extractDuration(step.description, (a, d, i) => (
                  <Box
                    component="a"
                    bgcolor="primary.main"
                    color="white"
                    px={0.8}
                    py={0.3}
                    borderRadius={10}
                    fontWeight={500}
                    key={i}
                    onClick={startTimer(d)}
                  >
                    {a}
                  </Box>
                ))}
              </Box>
            </Box>
          </Fragment>
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
    </RecipeTemplate>
  );
};

export default Recipe;
