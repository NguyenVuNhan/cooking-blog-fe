import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  toolbox: {
    position: "absolute",
    right: 30,
    top: 10,
  },
});

const ToolBox = () => {
  const classes = useStyle();
  const history = useHistory();

  const toAddRecipe = () => {
    history.push("/recipe/add");
  };

  return (
    <div className={classes.toolbox}>
      <IconButton color="primary" onClick={toAddRecipe}>
        <AddCircleIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

export default ToolBox;
