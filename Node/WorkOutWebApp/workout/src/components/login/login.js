import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import MenuBar from "../menu_bar/menu_bar";
import SimpleTabs from "./tab_bar";
import { Container } from "@material-ui/core";
import avatar_f from "../images/avatar_female.jfif";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  rightButton: {
    marginLeft: "auto",
    marginRight: theme.spacing(2),
    WebkitTextFillColor: (theme.color = "#47443B")
  }
}));

function LoginDialog({ updateMenuBarLogin }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Button className={classes.rightButton} onClick={handleClickOpen}>
        Login
      </Button>
      {/* TODO: Need to update to only show avatar when user is logged in */}
      <Avatar className={classes.rightButton} src={avatar_f} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <SimpleTabs />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginDialog;
