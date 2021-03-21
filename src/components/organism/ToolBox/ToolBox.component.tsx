import Backdrop from "@material-ui/core/Backdrop";
import MenuIcon from "@material-ui/icons/Menu";
import SpeedDial from "@material-ui/lab/SpeedDial";
import AddRecipeSDA from "components/atoms/AddRecipeSDA";
import React, { FC } from "react";
import useStyles from "./ToolBox.style";

interface Props {
  hidden?: boolean;
}

const ToolBox: FC<Props> = ({ hidden }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} style={{ zIndex: open ? 1 : undefined }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Tool Box"
        className={classes.speedDial}
        hidden={hidden}
        icon={<MenuIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <AddRecipeSDA open={open} />
      </SpeedDial>
    </div>
  );
};

export default ToolBox;
