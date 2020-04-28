import React from "react";
import { OnboardContext } from "./onboardContext";
import { AppContext } from "../../context";
import { TextField, Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { callHelloBackend } from "../../context";
import { getUserAuthentication } from "../../utils/fetchRequest.js";
import SnackbarAlert from "../snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rightButton: {
    marginLeft: "auto",
  },
  buttonsDiv: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = React.useContext(AppContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(undefined);
  const [severity, setSeverity] = React.useState("");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleLogin = async () => {
    if (username.trim() != "" && password.trim() != "") {
      let loginInfo = { UserLogin: username, UserPassword: password };
      let isAuth = JSON.parse(await getUserAuthentication(loginInfo));
      
      if (isAuth.status === true) {
        /* setMessage("Successfully logged in");
        setSeverity("success");
        openSnackbar(); */
        setIsUserLoggedIn(true);
        setIsOpen(false);
      } else {
        setMessage("Invalid credentials");
        setSeverity("error");
        openSnackbar();
      }
    } else {
      setMessage("Please enter all fields.");
      setSeverity("error");
      openSnackbar();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <React.Fragment className={classes.root}>
      <TextField
        autoFocus
        required
        id="username_login"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        fullWidth
      />
      <TextField
        required
        id="password_login"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        fullWidth
      />
      <div className={classes.buttonsDiv}>
        <Button
          className={classes.rightButton}
          onClick={() => {
            handleLogin();
          }}
          color="primary"
        >
          Login
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </div>
      <SnackbarAlert
        message={message}
        severity={severity}
        isOpen={isSnackbarOpen}
        close={closeSnackbar}
      />
    </React.Fragment>
  );
}

export default Login;
