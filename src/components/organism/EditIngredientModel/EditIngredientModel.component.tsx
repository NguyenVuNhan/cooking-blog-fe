import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import AddIngredientModal from "../AddIngredientModel";

interface Props {
  defaultIngredients: Ingredients;
  open: boolean;
  handleClose: () => void;
  onUpdate: (data: Partial<RecipeForm>) => void;
}

const EditIngredientModal: FC<Props> = ({
  defaultIngredients,
  onUpdate,
  ...rest
}) => {
  const { register, control, reset } = useForm<Pick<RecipeForm, "ingredients">>(
    {
      defaultValues: {
        ingredients: defaultIngredients,
      },
    }
  );
  const handleModalSave = (ingredients: Ingredients) => {
    onUpdate({ ingredients });
  };

  useEffect(() => {
    reset({ ingredients: defaultIngredients });
  }, [defaultIngredients]);

  return (
    <AddIngredientModal
      title="Edit Ingredient"
      control={control}
      register={register}
      handleSave={handleModalSave}
      {...rest}
    />
  );
};

export default EditIngredientModal;
