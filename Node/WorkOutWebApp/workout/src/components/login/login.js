import React from "react";
import { OnboardContext } from "./onboardContext";
import { TextField, Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { callHelloBackend } from "../../context";
import { getUserAuthentication } from "../../utils/fetchRequest.js";
//import MuiAlert from "@material-ui/lab/Alert";
import SnackbarAlert from "../snackbar";

/* function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
} */

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
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(undefined);
  const [severity, setSeverity] = React.useState("");

  const [UserLogin, setUserLogin] = React.useState("");
  const [UserPassword, setUserPassword] = React.useState("");

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleLogin = async () => {
    if (UserLogin.trim() != "" && UserPassword.trim() != "") {
      let loginInfo = { UserLogin: UserLogin, UserPassword: UserPassword };
      //alert('Before: '+ loginInfo);
      let data = JSON.parse(await getUserAuthentication(loginInfo));
      if (data.status === true) {
        setMessage("Successfully logged in");
        setSeverity("success");
        openSnackbar();
        setIsOpen(false);
      } else {
        setMessage("Invalid credentials");
        setSeverity("error");
        openSnackbar();
      }
    } else {
      //alert("Please enter all fields.");
      setMessage("Please enter all fields.");
      setSeverity("error");
      openSnackbar();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUserLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  return (
    <React.Fragment className={classes.root}>
      <TextField
        autoFocus
        required
        id="username_login"
        label="Username"
        value={UserLogin}
        onChange={handleUsernameChange}
        fullWidth
      />
      <TextField
        required
        id="password_login"
        label="Password"
        type="password"
        value={UserPassword}
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
