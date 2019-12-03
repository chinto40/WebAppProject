import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../images/fit_life.png";
import { textAlign } from "@material-ui/system";

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
  }
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.menu}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} className="App-logo" alt="logo" />
          <Button className={classes.button} color="#47443B">
            Workouts
          </Button>
          <Button className={classes.button} color="#47443B">
            Meal Plans
          </Button>
          <Button className={classes.button} color="#47443B">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuBar;
