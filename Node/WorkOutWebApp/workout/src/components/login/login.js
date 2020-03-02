import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import SimpleTabs from "./tab_bar";
import avatar_f from "../images/avatar_female.jfif";
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  rightButton: {
    marginLeft: "auto",
    WebkitTextFillColor: (theme.color = "#47443B")
  }
}));

function LoginDialog({ updateMenuBarLogin }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const avatarMenuOpen = Boolean(anchorEl);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAvatarClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button className={classes.rightButton} onClick={handleClickOpen}>
        Login
      </Button>
      {/* TODO: Need to update to only show avatar when user is logged in */}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-avatar"
        aria-haspopup="true"
        onClick={handleAvatarClick}
      >
        <Avatar className={classes.rightButton} src={avatar_f} />
      </IconButton>
      <Menu
        id="menu-avatar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={avatarMenuOpen}
        onClose={handleAvatarMenuClose}
      >
        <Link to="/userDashboard" style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleAvatarMenuClose}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleAvatarMenuClose}>Logout</MenuItem>
      </Menu>
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
