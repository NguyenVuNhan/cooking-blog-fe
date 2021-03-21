import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useInterval } from "hooks";
import React, { FC, SyntheticEvent, useState } from "react";

interface Props {
  open: boolean;
  duration: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: (event?: SyntheticEvent<any>, reason?: SnackbarCloseReason) => void;
}

const tick = 1000;

const TimerSnackbar: FC<Props> = ({ open, onClose, duration }) => {
  const [progress, setProgress] = useState(tick);
  const [time, setTime] = useState<{ h: number; m: number; s: number }>({
    h: 0,
    m: 0,
    s: 0,
  });
  useInterval(() => {
    setProgress(progress + tick > duration ? duration : progress + tick);
    const remain = (duration - progress) / 1000;
    const s = Math.ceil(remain % 60);
    const m = Math.floor((remain % (60 * 60)) / 60);
    const h = Math.floor(remain / (60 * 60));
    setTime({ h, m, s });
  }, tick);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
    >
      <div>
        <Alert onClose={onClose} severity="info">
          Time out: {time.h}:{time.m}:{time.s}
        </Alert>
        <LinearProgress
          variant="determinate"
          value={(progress * 100) / duration}
        />
      </div>
    </Snackbar>
  );
};

export default TimerSnackbar;
