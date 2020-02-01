import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../images/fit_life.png";
import avatar_f from "../images/avatar_female.jfif";
import LoginDialog from "../login/login";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menu: {
    backgroundColor: (theme.color = "#8ABD00")
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "#47443B"
  },
  title: {
    flexGrow: 1
  },
  button: {
    marginRight: theme.spacing(2),
    WebkitTextFillColor: (theme.color = "#47443B")
  },
  rightButton: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    WebkitTextFillColor: (theme.color = "#47443B")
  }
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <Link to="/workoutBuilder" style={{ textDecoration: "none" }}>
            <Button className={classes.button}>Workout Builder</Button>
          </Link>
          <Link to="workouts" style={{ textDecoration: "none" }}>
            <Button className={classes.button}>Workouts</Button>
          </Link>
          <Link
            to="/login"
            style={{ textDecoration: "none", marginLeft: "auto" }}
          >
            <Button className={classes.rightButton} onClick={<LoginDialog />}>
              Login
            </Button>
          </Link>
          {/* TODO: Need to update to only show avatar when user is logged in */}
          <Avatar src={avatar_f} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
