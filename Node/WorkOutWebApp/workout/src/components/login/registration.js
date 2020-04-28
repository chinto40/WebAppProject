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
import { makeStyles } from "@material-ui/core/styles";
import { OnboardContext } from "./onboardContext";
import { registerUser } from "../../utils/fetchRequest.js";
import {
  validateUsername,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateHeightFt,
  validateHeightIn,
  validateWeight,
  validateAge,
  validateActivityLevel,
  validateGender,
} from "../../utils/validator";
import SnackbarAlert from "../snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "&$error": {
      color: "red",
    },
  },
  error: {
    color: "red",
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
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(undefined);
  const [severity, setSeverity] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [heightFt, setHeightFt] = React.useState(null);
  const [heightIn, setHeightIn] = React.useState(null);
  const [currentWeight, setCurrentWeight] = React.useState(null);
  const [activityLevel, setActivityLevel] = React.useState(null);
  const [goalWeight, setGoalWeight] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleRegistration = async () => {
    let registrationHasErrors = false;
    for (let [key, value] of Object.entries(errors)) {
      if (value === true) {
        registrationHasErrors = true;
        alert("Registration errors");
      }
    }

    if (registrationHasErrors) {
      setMessage("Please enter valid information for all fields.");
      setSeverity("error");
      openSnackbar();
    } else {
      // call registration function
      let registrationInfo = {
        FirstName: firstName,
        LastName: lastName,
        User_Gender: gender,
        User_Age: age,
        User_Height_Ft: heightFt,
        User_Height_In: heightIn,
        Current_Weight: currentWeight,
        Activity_Level: activityLevel,
        Goal_Weight: goalWeight,
        UserLogin: username,
        UserPassword: password,
      };

      //console.log(registrationInfo);
      //alert(registrationInfo)
      let registerStatus = JSON.parse(await registerUser(registrationInfo));
      alert(registerStatus);
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFirstNameChange = (event) => {
    let isError = validateFirstName(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    let isError = validateLastName(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setLastName(event.target.value);
  };

  const handleGenderChange = (event) => {
    let isError = validateGender(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (isError) {
      document.getElementById("gender_label").style.color = "red";
    } else {
      setGender(event.target.value);
      document.getElementById("gender_label").style = classes.height;
    }
  };

  const handleAgeChange = (event) => {
    let isError = validateAge(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setAge(event.target.value);
  };

  const handleUsernameChange = (event) => {
    let isError = validateUsername(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setUsername(event.target.value);
  };

  const handleHeightFtChange = (event) => {
    let isError = validateHeightFt(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setHeightFt(event.target.value);
    if (isError) {
      document.getElementById("height_ft_label").style.color = "red";
    } else {
      document.getElementById("height_ft_label").style = classes.height;
    }
  };

  const handleHeightInChange = (event) => {
    let isError = validateHeightIn(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setHeightIn(event.target.value);
    if (isError) {
      document.getElementById("height_in_label").style.color = "red";
    } else {
      document.getElementById("height_in_label").style = classes.height;
    }
  };

  const handleCurrentWeightChange = (event) => {
    let isError = validateWeight(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setCurrentWeight(event.target.value);
    if (isError) {
      document.getElementById("weight_label").style.color = "red";
    } else {
      document.getElementById("weight_label").style = classes.height;
    }
  };

  const handleActivityLevelChange = (event) => {
    let isError = validateActivityLevel(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (isError) {
      document.getElementById("activity_level_label").style.color = "red";
    } else {
      setActivityLevel(event.target.value);
      document.getElementById("activity_level_label").style = classes.height;
    }
  };

  const handleGoalWeightChange = (event) => {
    let isError = validateWeight(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setGoalWeight(event.target.value);
    if (isError) {
      document.getElementById("goal_weight_label").style.color = "red";
    } else {
      document.getElementById("goal_weight_label").style = classes.height;
    }
  };

  const handlePasswordChange = (event) => {
    let isError = validatePassword(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setPassword(event.target.value);
  };

  const toggleIsSnackbarOpen = () => {
    isSnackbarOpen ? setIsSnackbarOpen(false) : setIsSnackbarOpen(true);
  };

  const handleErrorCheck = (field, isError) => {
    let obj = { [field]: isError };
    setErrors(Object.assign(errors, obj));
  };

  return (
    <React.Fragment className={classes.root}>
      <TextField
        autoFocus
        required
        id="first_name"
        label="First Name"
        value={firstName}
        onChange={handleFirstNameChange}
        className={classes.halfLeft}
        error={errors["first_name"]}
        onBlur={handleFirstNameChange}
      />
      <TextField
        required
        id="last_name"
        label="Last Name"
        value={lastName}
        onChange={handleLastNameChange}
        className={classes.halfRight}
        error={errors["last_name"]}
        onBlur={handleLastNameChange}
      />
      <FormControl required className={classes.gender}>
        <InputLabel id="gender_label">Gender</InputLabel>
        <Select
          id="gender"
          value={gender}
          label="gender_label"
          onChange={handleGenderChange}
          error={errors["gender"]}
          onBlur={handleGenderChange}
        >
          <MenuItem value={0}>Female</MenuItem>
          <MenuItem value={1}>Male</MenuItem>
        </Select>
      </FormControl>
      <FormControl required className={classes.height}>
        <InputLabel id="height_ft_label">Height</InputLabel>
        <Input
          id="height_ft"
          label="Height"
          value={heightFt}
          onChange={handleHeightFtChange}
          error={errors["height_ft"]}
          endAdornment={<InputAdornment position="end">ft</InputAdornment>}
          onBlur={handleHeightFtChange}
        />
      </FormControl>
      <FormControl required className={classes.height}>
        <InputLabel id="height_in_label">Height</InputLabel>
        <Input
          id="height_in"
          label="Height"
          value={heightIn}
          onChange={handleHeightInChange}
          error={errors["height_in"]}
          onBlur={handleHeightInChange}
          endAdornment={<InputAdornment position="end">in</InputAdornment>}
        />
      </FormControl>
      <TextField
        required
        id="age"
        label="Age"
        value={age}
        onChange={handleAgeChange}
        error={errors["age"]}
        className={classes.halfLeft}
        onBlur={handleAgeChange}
      />
      <FormControl required className={classes.halfRight}>
        <InputLabel id="weight_label">Weight</InputLabel>
        <Input
          id="weight"
          value={currentWeight}
          onChange={handleCurrentWeightChange}
          error={errors["weight"]}
          onBlur={handleCurrentWeightChange}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
        />
      </FormControl>
      <FormControl required className={classes.halfLeft}>
        <InputLabel id="activity_level_label">Activity Level</InputLabel>
        <Select
          id="activity_level"
          value={activityLevel}
          onChange={handleActivityLevelChange}
          error={errors["activity_level"]}
          onBlur={handleActivityLevelChange}
        >
          <MenuItem value={0}>Little to no exercise</MenuItem>
          <MenuItem value={1}>Exercise 1 - 3 times/week</MenuItem>
          <MenuItem value={2}>Exercise 4 - 5 times/week</MenuItem>
          <MenuItem value={3}>Exercise 6 - 7 times/week</MenuItem>
        </Select>
      </FormControl>
      <FormControl required className={classes.halfRight}>
        <InputLabel id="goal_weight_label">Goal Weight</InputLabel>
        <Input
          id="goal_weight"
          value={goalWeight}
          onChange={handleGoalWeightChange}
          error={errors["goal_weight"]}
          onBlur={handleGoalWeightChange}
          endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
        />
      </FormControl>
      <TextField
        required
        id="username_reg"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        error={errors["username_reg"]}
        onBlur={handleUsernameChange}
        fullWidth
      />
      <TextField
        required
        id="password_reg"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        error={errors["password_reg"]}
        onBlur={handlePasswordChange}
        fullWidth
      />
      <div className={classes.buttonsDiv}>
        <Button
          className={classes.rightButton}
          onClick={handleRegistration}
          color="primary"
        >
          Register
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </div>
      <SnackbarAlert
        message={message}
        severity={severity}
        isOpen={isSnackbarOpen}
        close={closeSnackbar}
      />
    </React.Fragment>
  );
}

export default Registration;
