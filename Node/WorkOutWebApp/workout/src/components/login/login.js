import React, { useContext } from "react";
import { OnboardContext } from "./onboardContext";
import {
  TextField,
  Button,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { callHelloBackend } from "../../context";

function Login() {
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);
  const { isSnackbarOpen, setIsSnackbarOpen } = React.useState(false);

  const [UserLogin, setUserLogin] = React.useState("");
  const [UserPassword, setUserPassword] = React.useState("");

  const handleLogin = () => {
    if (UserLogin != "" && UserPassword != "") {
      // call login function here
      //npcallHelloBackend();
      //console.log("username: " + UserLogin + ", password: " + UserPassword);
      alert("All good!");
      setIsOpen(false);
    } else {
      alert("Please enter all fields.");
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
    <React.Fragment>
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
      <Button
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
    </React.Fragment>
  );
}

export default Login;
