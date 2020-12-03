import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import { isEmpty } from "helpers/validates";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import StepFormGroup from "../components/StepFormGroup";
import AddIngredientModal from "../components/AddIngredientModal";
import firebase from "firebase";
import { addRecipe } from "../recipes.actions";
import { useHistory } from "react-router-dom";

const AddRecipe: React.FC = () => {
  const history = useHistory();
  const {
    register,
    errors,
    setError,
    control,
    handleSubmit,
  } = useForm<RecipeForm>({
    defaultValues: {
      steps: [],
      ingredients: [],
    },
  });

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [stepsError, setStepsError] = useState<string>("");
  const stepIngredient = useRef<string[][]>([]);

  const onSubmit = (data: Recipe) => {
    if (isEmpty(data.steps)) {
      setStepsError("At least 1 step is required");
      return;
    }
    if (isEmpty(ingredients)) {
      setError("ingredients", {
        type: "required",
        message: "Ingredient is required",
      });
      return;
    }

    const owner = firebase.auth().currentUser?.uid;
    data.steps = data.steps.map((step, index) => ({
      ...step,
      ingredients: stepIngredient.current[index],
    }));

    addRecipe(
      {
        ...data,
        owner,
      },
      () => {
        history.push("/");
      }
    );
  };

  return (
    <RecipeFeatureTemplate showToolBox={false}>
      <Grid
        container
        alignItems="flex-start"
        noValidate
        component="form"
        spacing={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item sm={12}>
          <Typography variant="h2" align="center" noWrap>
            Add New Recipe
          </Typography>
        </Grid>
        <Grid item sm={12}>
          {stepsError && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {stepsError}
            </Alert>
          )}
        </Grid>
        <Grid item sm={9}>
          <TextField
            name="title"
            inputRef={register({ required: "Title is required" })}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            label="Title"
            fullWidth
          />
        </Grid>
        <Grid item sm={3}>
          <TextField
            name="duration"
            label="Duration"
            inputRef={register({ required: "Duration is required" })}
            error={Boolean(errors.duration)}
            helperText={errors.duration?.message}
            fullWidth
          />
        </Grid>
        <Grid item sm={12}>
          <TextField
            name="description"
            label="Description"
            inputRef={register}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            fullWidth
          />
        </Grid>

        <Grid item sm={4} container spacing={3}>
          <h3>
            Ingredients:
            {ingredients.map((ingredient: string, index: number) => (
              <Chip key={index} size="small" label={ingredient} />
            ))}
          </h3>
          <AddIngredientModal {...{ control, setIngredients, register }} />
        </Grid>

        <StepFormGroup
          control={control}
          errors={errors}
          register={register}
          ingredients={ingredients}
          stepIngredient={stepIngredient.current}
        />
        <Grid item container sm={12}>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </RecipeFeatureTemplate>
  );
};

export default AddRecipe;
