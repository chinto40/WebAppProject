import React from "react";
import { OnboardContext } from "./onboardContext";
import { TextField, Button } from "@material-ui/core";
import { callHelloBackend } from "../../context";

function Login() {
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);

  const handleLogin = () => {
    // call login function here
    callHelloBackend();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <TextField autofocus id="username_login" label="Username" fullWidth />
      <TextField id="password_login" label="Password" fullWidth />
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
