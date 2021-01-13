import React, { FC } from "react";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
import { forwardTo } from "helpers/router";

interface Props {
  open?: boolean;
}

const AddRecipeSDA: FC<Props> = ({ open }) => {
  const toAddRecipe = () => {
    forwardTo("/recipe/add");
  };

  return (
    <SpeedDialAction
      icon={<AddIcon />}
      tooltipTitle="Add Recipe"
      tooltipOpen
      open={open}
      onClick={toAddRecipe}
    />
  );
};

export default AddRecipeSDA;
