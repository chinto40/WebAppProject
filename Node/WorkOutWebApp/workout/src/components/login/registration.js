import React, { useContext } from "react";
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
import { makeStyles } from "@material-ui/core/styles";
import { OnboardContext } from "./onboardContext";
import { callHelloBackend } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

function Registration() {
  const classes = useStyles();
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);
  const { isSnackbarOpen, setIsSnackbarOpen } = React.useState(false);

  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [User_Height_Ft, setUser_Height_Ft] = React.useState(null);
  const [User_Height_In, setUser_Height_In] = React.useState(null);
  const [Current_Weight, setCurrent_Weight] = React.useState(null);
  const [ExerciseLevel, setExerciseLevel] = React.useState(null);
  const [Goal_Weight, setGoal_Weight] = React.useState(null);
  const [UserLogin, setUserLogin] = React.useState("");
  const [UserPassword, setUserPassword] = React.useState("");

  const handleRegistration = () => {
    // call registration function here
    callHelloBackend();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUserLogin(event.target.value);
  };

  const handleUserHeightFtChange = (event) => {
    setUser_Height_Ft(event.target.value);
  };

  const handleUserHeightInChange = (event) => {
    setUser_Height_In(event.target.value);
  };

  const handleCurrentWeightChange = (event) => {
    setCurrent_Weight(event.target.value);
  };

  const handleExerciseLevelChange = (event) => {
    setExerciseLevel(event.target.value);
  };

  const handleGoalWeightChange = (event) => {
    setGoal_Weight(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const toggleIsSnackbarOpen = () => {
    isSnackbarOpen ? setIsSnackbarOpen(false) : setIsSnackbarOpen(true);
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
