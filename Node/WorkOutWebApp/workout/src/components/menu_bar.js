import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Avatar, IconButton, Menu, MenuItem, Dialog } from "@material-ui/core";
import avatar_f from "./images/avatar_female.jfif";
import logo from "./images/fit_life.png";
import { Link } from "react-router-dom";
import { OnboardContext } from "./login/onboardContext";
import { AppContext } from "../context";
import LoginDialog from "./login/loginDialog";

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: (theme.color = "#8ABD00"),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  root: {
    flexGrow: 1,
    WebkitTextFillColor: (theme.color = "#47443B"),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
    WebkitTextFillColor: (theme.color = "#47443B"),
  },
  rightButton: {
    marginLeft: "auto",
    WebkitTextFillColor: (theme.color = "#47443B"),
  },
}));

const MenuBar = (props) => {
  const classes = useStyles();
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = React.useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const avatarMenuOpen = Boolean(anchorEl);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    handleAvatarMenuClose();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>

            {isUserLoggedIn ? (
              <Link to="/workoutBuilder" style={{ textDecoration: "none" }}>
                <Button className={classes.button}>Workout Builder</Button>
              </Link>
            ) : (
              <Button className={classes.button} onClick={handleClickOpen}>
                Workout Builder
              </Button>
            )}
            {isUserLoggedIn ? (
              <Link to="/workouts" style={{ textDecoration: "none" }}>
                <Button className={classes.button}>Workouts</Button>
              </Link>
            ) : (
              <Button className={classes.button} onClick={handleClickOpen}>
                Workouts
              </Button>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            {isUserLoggedIn ? null : (
              <Button className={classes.rightButton} onClick={handleClickOpen}>
                Login
              </Button>
            )}
            {/* TODO: Need to update to only show avatar when user is logged in */}
            {isUserLoggedIn ? (
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-avatar"
                aria-haspopup="true"
                onClick={handleAvatarClick}
              >
                <Avatar className={classes.rightButton} src={avatar_f} />
              </IconButton>
            ) : null}
            <Menu
              id="menu-avatar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              WebkitTextFillColor="black"
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={avatarMenuOpen}
              onClose={handleAvatarMenuClose}
              className={classes.root}
            >
              <Link
                to="/userDashboard"
                style={{ textDecoration: "none" }}
                className={classes.root}
              >
                <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog
              open={isOpen}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <LoginDialog />
            </Dialog>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
