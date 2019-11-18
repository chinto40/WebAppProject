import React from "react";
import { ThemeProvider } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.color
  }
}));

const landingPage = () => {
  const classes = useStyles();

  /*return (
        <div className={classes.root}>
            <img src={}
        </div>
    )*/
};
