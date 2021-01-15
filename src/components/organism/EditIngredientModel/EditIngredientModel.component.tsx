import React, { FC } from "react";
import { useForm } from "react-hook-form";
import AddIngredientModal from "../AddIngredientModel";

interface Props {
  defaultIngredients: Ingredients;
  open: boolean;
  handleClose: () => void;
  onUpdate: (data: Partial<RecipeForm>) => void;
}

const EditIngredientModel: FC<Props> = ({
  defaultIngredients,
  onUpdate,
  ...rest
}) => {
  const { register, control } = useForm<Pick<RecipeForm, "ingredients">>({
    defaultValues: {
      ingredients: defaultIngredients,
    },
  });
  const handleModalSave = (ingredients: Ingredients) => {
    onUpdate({ ingredients });
  };

  return (
    <AddIngredientModal
      control={control}
      register={register}
      handleSave={handleModalSave}
      {...rest}
    />
  );
};

export default EditIngredientModel;
