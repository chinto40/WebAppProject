import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SimpleTabs from "./tab_bar";

export default function LoginDialog() {
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleLoginClick = () => {
    LoginDialog.setOpenLogin(true);
  };

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleLoginClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Login</DialogTitle>
      <SimpleTabs />
      <DialogContent>Hello</DialogContent>

      <DialogActions>
        <Button onClick={handleLoginClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLoginClose} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}
