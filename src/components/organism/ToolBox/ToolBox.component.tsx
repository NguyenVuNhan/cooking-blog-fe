import Backdrop from "@material-ui/core/Backdrop";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import { forwardTo } from "helpers/router";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "reducers/rootReducer";
import { logout } from "./ToolBox.actions";
import useStyles from "./ToolBox.style";

interface Props {
  hidden?: boolean;
}

const ToolBox: FC<Props> = ({ hidden }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<IRootState>(
    (state) => state.auth.authenticated
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    dispatch(logout());
    forwardTo("/");
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
        {isAuthenticated ? (
          <SpeedDialAction
            icon={<ExitToAppIcon />}
            tooltipTitle="Logout"
            tooltipOpen
            open={open}
            onClick={onLogout}
          />
        ) : (
          <SpeedDialAction
            icon={<AccountCircleIcon />}
            tooltipTitle="Login"
            tooltipOpen
            open={open}
            onClick={() => forwardTo("/login")}
          />
        )}
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Add Recipe"
          tooltipOpen
          open={open}
          onClick={() => forwardTo("/recipe/add")}
        />
      </SpeedDial>
    </div>
  );
};

export default ToolBox;
