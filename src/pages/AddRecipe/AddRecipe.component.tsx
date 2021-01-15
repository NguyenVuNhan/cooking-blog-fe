import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import ErrorBadge from "components/molecules/ErrorBadge";
import AddIngredientModal from "components/organism/AddIngredientModel";
import AddStepGroup from "components/organism/AddStepGroup";
import RecipeFeatureTemplate from "components/templates/recipeFeature.template";
import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as types from "./AddRecipe.types";

interface Props {
  onAddRecipe: (stepIngredient: string[][]) => (data: RecipeForm) => void;
}

const AddRecipe: FC<Props> = ({ onAddRecipe }) => {
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
  const handleModalSave = (ingredients: Ingredients) => {
    setIngredients(ingredients.map((val) => val.ingredient));
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
          <ErrorBadge type={types.ADD_RECIPE} />
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

      <AddIngredientModal
        control={control}
        register={register}
        open={modalOpen}
        handleClose={handleModalClose}
        handleSave={handleModalSave}
      />
    </RecipeFeatureTemplate>
  );
};

export default AddRecipe;
