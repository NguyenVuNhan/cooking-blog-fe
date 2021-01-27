import React, { FC, MouseEventHandler } from "react";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

interface Props {
  show: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const EditButton: FC<Props> = ({ show, onClick }) => {
  if (!show) return null;
  return (
    <IconButton size="small" onClick={onClick}>
      <EditIcon fontSize="inherit" />
    </IconButton>
  );
};

export default EditButton;
