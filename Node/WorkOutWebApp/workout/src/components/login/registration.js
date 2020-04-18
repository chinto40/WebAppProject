import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  TextField,
} from "@material-ui/core";
import { OnboardContext } from "./onboardContext";
import { callHelloBackend } from "../../context";

function Registration() {
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);

  const handleRegistration = () => {
    // call registration function here
    callHelloBackend();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      <TextField autofocus id="first_name" label="First Name" fullWidth />
      <TextField id="last_name" label="Last Name" fullWidth />
      <FormControl>
        <InputLabel>Height</InputLabel>
        <Input
          id="height_ft"
          label="Height"
          endAdornment={<InputAdornment position="end">ft</InputAdornment>}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Input
          id="height_in"
          endAdornment={<InputAdornment position="end">in</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Weight</InputLabel>
        <Input
          id="weight"
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Exercise Level</InputLabel>
        <Select id="exercise_level">
          <MenuItem value={0}>Little to no exercise</MenuItem>
          <MenuItem value={1}>Exercise 1 - 3 times/week</MenuItem>
          <MenuItem value={2}>Exercise 4 - 5 times/week</MenuItem>
          <MenuItem value={3}>Exercise 6 - 7 times/week</MenuItem>
        </Select>
      </FormControl>
      <TextField id="goal_weight" label="Goal Weight" fullWidth />
      <TextField id="username_reg" label="Username" fullWidth />
      <TextField id="password_reg" label="Password" fullWidth />
      <Button
        onClick={() => {
          handleRegistration();
        }}
        color="primary"
      >
        Register
      </Button>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
    </React.Fragment>
  );
}

export default Registration;
