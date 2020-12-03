import Fade from "@material-ui/core/Fade";
import Modal, { ModalProps } from "@material-ui/core/Modal";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent, ReactNode } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "100vh",
    overflow: "auto",
  },
}));

type Props = Modify<ModalProps, { children: ReactNode; title: string }>;

const ModalTemplate: FunctionComponent<Props> = ({
  title,
  children,
  open,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Modal {...rest} className={classes.modal} open={open}>
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 className="text-center">{title}</h2>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalTemplate;
