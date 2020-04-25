import React, { useContext } from "react";
import { OnboardContext } from "./onboardContext";
import { TextField, Button, Snackbar, IconButton } from "@material-ui/core";
import { CloseIcon } from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { callHelloBackend } from "../../context";
import { getUserAuthentication } from "../../utils/fetchRequest.js";
//const fetch = require("../../utils/fetchRequest");

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

  const [UserLogin, setUserLogin] = React.useState("");
  const [UserPassword, setUserPassword] = React.useState("");

  const toggleIsSnackbarOpen = () => {
    isSnackbarOpen ? setIsSnackbarOpen(false) : setIsSnackbarOpen(true);
  };

  const handleLogin = async () => {
    if (UserLogin.trim() != "" && UserPassword.trim() != "") {
      let loginInfo = { UserLogin: UserLogin, UserPassword: UserPassword };
      //alert('Before: '+ loginInfo);
    let data =  JSON.parse(await getUserAuthentication(loginInfo))
      alert('Frontend: '+ data.status);
      setIsOpen(data.status);
 
    } else {
      //alert("Please enter all fields.");
      toggleIsSnackbarOpen();
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isSnackbarOpen}
        autoHideDuration={5000}
        onClose={toggleIsSnackbarOpen}
        message="Please enter all fields."
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={toggleIsSnackbarOpen}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export default Login;
