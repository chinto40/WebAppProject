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
import {
  validateUsername,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateHeightFt,
  validateHeightIn,
  validateWeight,
  validateAge,
} from "../../utils/validator";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  height: {
    marginLeft: theme.spacing(2),
    width: "32%",
  },
  halfLeft: {
    width: "48%",
  },
  halfRight: {
    marginLeft: theme.spacing(2),
    width: "49%",
  },
  gender: {
    width: "30%",
  },
  rightButton: {
    marginLeft: "auto",
  },
  buttonsDiv: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
}));

function Registration() {
  const classes = useStyles();
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);
  const { isSnackbarOpen, setIsSnackbarOpen } = React.useState(false);

  const [FirstName, setFirstName] = React.useState("");
  const [LastName, setLastName] = React.useState("");
  const [User_Gender, setUser_Gender] = React.useState(null);
  const [User_Age, setUser_Age] = React.useState(null);
  const [User_Height_Ft, setUser_Height_Ft] = React.useState(null);
  const [User_Height_In, setUser_Height_In] = React.useState(null);
  const [Current_Weight, setCurrent_Weight] = React.useState(null);
  const [Activity_Level, setActivity_Level] = React.useState(null);
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

  const handleUserGenderChange = (event) => {
    setUser_Gender(event.target.value);
  };

  const handleUserAgeChange = (event) => {
    setUser_Age(event.target.value);
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

  const handleActivity_LevelChange = (event) => {
    setActivity_Level(event.target.value);
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
    <React.Fragment className={classes.root}>
      <TextField
        required
        autofocus
        id="first_name"
        label="First Name"
        value={FirstName}
        onChange={handleFirstNameChange}
        className={classes.halfLeft}
        onBlur={(e) => validateFirstName(e.target.value)}
      />
      <TextField
        required
        id="last_name"
        label="Last Name"
        value={LastName}
        onChange={handleLastNameChange}
        className={classes.halfRight}
        onBlur={(e) => validateLastName(e.target.value)}
      />
      <FormControl required className={classes.gender}>
        <InputLabel>Gender</InputLabel>
        <Select
          id="gender"
          value={User_Gender}
          onChange={handleUserGenderChange}
        >
          <MenuItem value={0}>Female</MenuItem>
          <MenuItem value={1}>Male</MenuItem>
        </Select>
      </FormControl>
      <FormControl required className={classes.height}>
        <InputLabel>Height</InputLabel>
        <Input
          id="height_ft"
          label="Height"
          value={User_Height_Ft}
          onChange={handleUserHeightFtChange}
          onBlur={(e) => validateHeightFt(e.target.value)}
          endAdornment={<InputAdornment position="end">ft</InputAdornment>}
        />
      </FormControl>
      <FormControl required className={classes.height}>
        <InputLabel>Height</InputLabel>
        <Input
          id="height_in"
          label="Height"
          value={User_Height_In}
          onChange={handleUserHeightInChange}
          onBlur={(e) => validateHeightIn(e.target.value)}
          endAdornment={<InputAdornment position="end">in</InputAdornment>}
        />
      </FormControl>
      <TextField
        required
        id="age"
        label="Age"
        value={User_Age}
        onChange={handleUserAgeChange}
        onBlur={(e) => validateAge(e.target.value)}
        className={classes.halfLeft}
      />
      <FormControl required className={classes.halfRight}>
        <InputLabel>Weight</InputLabel>
        <Input
          id="weight"
          value={Current_Weight}
          onChange={handleCurrentWeightChange}
          onBlur={(e) => validateWeight(e.target.value)}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
        />
      </FormControl>
      <FormControl required className={classes.halfLeft}>
        <InputLabel>Activity Level</InputLabel>
        <Select
          id="activity_level"
          value={Activity_Level}
          onChange={handleActivity_LevelChange}
        >
          <MenuItem value={0}>Little to no exercise</MenuItem>
          <MenuItem value={1}>Exercise 1 - 3 times/week</MenuItem>
          <MenuItem value={2}>Exercise 4 - 5 times/week</MenuItem>
          <MenuItem value={3}>Exercise 6 - 7 times/week</MenuItem>
        </Select>
      </FormControl>
      <FormControl required className={classes.halfRight}>
        <InputLabel>Goal Weight</InputLabel>
        <Input
          id="goal_weight"
          value={Goal_Weight}
          onChange={handleGoalWeightChange}
          onBlur={(e) => validateWeight(e.target.value)}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
        />
      </FormControl>
      <TextField
        required
        id="username_reg"
        label="Username"
        value={UserLogin}
        onChange={handleUsernameChange}
        onBlur={(e) => validateUsername(e.target.value)}
        fullWidth
      />
      <TextField
        required
        id="password_reg"
        label="Password"
        value={UserPassword}
        onChange={handlePasswordChange}
        onBlur={(e) => validatePassword(e.target.value)}
        fullWidth
      />
      <div className={classes.buttonsDiv}>
        <Button
          className={classes.rightButton}
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
      </div>
    </React.Fragment>
  );
}

export default Registration;
