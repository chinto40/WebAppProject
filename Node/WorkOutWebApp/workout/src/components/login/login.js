import React, { useContext } from "react";
import { OnboardContext } from "./onboardContext";
import {
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { callHelloBackend } from "../../context";

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
  const { isSnackbarOpen, setIsSnackbarOpen } = React.useState(false);

  const [UserLogin, setUserLogin] = React.useState("");
  const [UserPassword, setUserPassword] = React.useState("");

  const handleLogin = () => {
    if (UserLogin.trim() != "" && UserPassword.trim() != "") {
      // call login function here
      //npcallHelloBackend();
      alert(UserLogin.trim() === "string");
      //console.log("username: " + UserLogin + ", password: " + UserPassword);
      alert("All good!");
      setIsOpen(false);
    } else {
      alert("Please enter all fields.");
      //alert(typeof UserLogin.trim() === "string");
      return {
        /* <Snackbar
          open={isSnackbarOpen}
          onClose={toggleIsSnackbarOpen}
          message="Please enter all fields."
        /> */
      };
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

  const toggleIsSnackbarOpen = () => {
    isSnackbarOpen ? setIsSnackbarOpen(false) : setIsSnackbarOpen(true);
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
    </React.Fragment>
  );
}

export default Login;
