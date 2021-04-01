import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveIcon from "@material-ui/icons/Remove";
import React, { FC, useState } from "react";

interface Props {
  onSelect?: () => void;
  onRemove?: () => void;
}

const ToShoppingButton: FC<Props> = ({ onSelect, onRemove }) => {
  const [added, setAdded] = useState(false);

  const onClick = () => {
    !added ? onSelect && onSelect() : onRemove && onRemove();
    setAdded(!added);
  };

  return (
    <IconButton size="small" color="primary" onClick={onClick}>
      {added ? (
        <RemoveIcon fontSize="inherit" />
      ) : (
        <AddCircleIcon fontSize="inherit" />
      )}
    </IconButton>
  );
};

export default ToShoppingButton;
