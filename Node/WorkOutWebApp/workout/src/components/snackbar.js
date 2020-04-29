import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function SnackbarAlert({ message, severity, isOpen, close }) {
  const classes = useStyles();
  const isSnackbarOpen = isOpen;

  return (
    <Snackbar
      id="login_snackbar"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={isSnackbarOpen}
      autoHideDuration={5000}
      onClose={close}
    >
      <Alert severity={severity} onClose={close}>
        {message}
      </Alert>
      {/* action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        } */}
    </Snackbar>
  );
}

export default SnackbarAlert;
