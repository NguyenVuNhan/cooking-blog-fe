import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Alert from "@material-ui/lab/Alert";
import AddIngredientModal from "components/organism/AddIngredientModel";
import AddStepGroup from "components/organism/AddStepGroup";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as types from "./AddRecipe.types";

interface Props {
  onAddRecipe: (stepIngredient: string[][]) => (data: RecipeForm) => void;
  error?: types.AddRecipeFailureAction["error"];
}

const AddRecipe: FC<Props> = ({ error, onAddRecipe }) => {
  const { register, errors, control, handleSubmit } = useForm<RecipeForm>({
    defaultValues: {
      steps: [],
      ingredients: [],
    },
  });

  // Handle ingredients autosuggestion for each step
  const [ingredients, setIngredients] = useState<string[]>([]);
  const stepIngredient = useRef<string[][]>([]);

  // Handle modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <RecipeFeatureTemplate showToolBox={false}>
      <Grid
        container
        alignItems="flex-start"
        noValidate
        component="form"
        spacing={3}
        onSubmit={handleSubmit(onAddRecipe(stepIngredient.current))}
      >
        <Grid item sm={12}>
          <Typography variant="h2" align="center" noWrap>
            Add New Recipe
          </Typography>
        </Grid>
        <Grid item sm={12}>
          {error &&
            error.errors.map((e, index) => (
              <Alert key={index} severity="error" className="mb-1">
                {e.msg}
              </Alert>
            ))}
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

        <Grid item sm={4} container spacing={3}>
          <h3 className="ml-2">
            Ingredients:
            {ingredients.map((ingredient: string, index: number) => (
              <Chip key={index} size="small" label={ingredient} />
            ))}
          </h3>
          <IconButton color="primary" onClick={handleModalOpen}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Grid>

        <AddIngredientModal
          control={control}
          register={register}
          setIngredients={setIngredients}
          open={modalOpen}
          onClose={handleModalClose}
        />

        <AddStepGroup
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
