import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "./images/fit_life.png";
import { Link } from "react-router-dom";
import LoginDialog from "./login/loginDialog";
import OnboardContext from "./login/onboardContext";

const useStyles = makeStyles((theme) => ({
  menu: {
    backgroundColor: (theme.color = "#8ABD00"),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  button: {
    marginRight: theme.spacing(2),
    WebkitTextFillColor: (theme.color = "#47443B"),
  },
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} className="App-logo" alt="logo" />
            </Link>
            <Link to="/workoutBuilder" style={{ textDecoration: "none" }}>
              <Button className={classes.button}>Workout Builder</Button>
            </Link>
            <Link to="workouts" style={{ textDecoration: "none" }}>
              <Button className={classes.button}>Workouts</Button>
            </Link>
          </div>
          <OnboardContext>
            <LoginDialog />
          </OnboardContext>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
