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
  validateActivityLevel,
  validateGender,
} from "../../utils/validator";

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
  const [errors, setErrors] = React.useState({});

  const handleRegistration = () => {
    // call registration function here
    callHelloBackend();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleFirstNameChange = (event) => {
    let isError = validateFirstName(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (!isError) {
      setFirstName(event.target.value);
    }
  };

  const handleLastNameChange = (event) => {
    let isError = validateLastName(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (!isError) {
      setLastName(event.target.value);
    }
  };

  const handleUserGenderChange = (event) => {
    let isError = validateGender(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (isError) {
      document.getElementById("gender_label").style.color = "red";
    } else {
      setUser_Gender(event.target.value);
      document.getElementById("gender_label").style = classes.height;
    }
  };

  const handleUserAgeChange = (event) => {
    let isError = validateAge(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (!isError) {
      setUser_Age(event.target.value);
    }
  };

  const handleUsernameChange = (event) => {
    let isError = validateUsername(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (!isError) {
      setUserLogin(event.target.value);
    }
  };

  const handleUserHeightFtChange = (event) => {
    let isError = validateHeightFt(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setUser_Height_Ft(event.target.value);
    if (isError) {
      document.getElementById("height_ft_label").style.color = "red";
    } else {
      document.getElementById("height_ft_label").style = classes.height;
    }
  };

  const handleUserHeightInChange = (event) => {
    let isError = validateHeightIn(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setUser_Height_In(event.target.value);
    if (isError) {
      document.getElementById("height_in_label").style.color = "red";
    } else {
      document.getElementById("height_in_label").style = classes.height;
    }
  };

  const handleCurrentWeightChange = (event) => {
    let isError = validateWeight(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    setCurrent_Weight(event.target.value);
    if (isError) {
      document.getElementById("weight_label").style.color = "red";
    } else {
      document.getElementById("weight_label").style = classes.height;
    }
  };

  const handleActivity_LevelChange = (event) => {
    let isError = validateActivityLevel(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (isError) {
      document.getElementById("activity_level_label").style.color = "red";
    } else {
      setActivity_Level(event.target.value);
      document.getElementById("activity_level_label").style = classes.height;
    }
  };

  const handleGoalWeightChange = (event) => {
    let isError = validateWeight(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (isError) {
      document.getElementById("goal_weight_label").style.color = "red";
    } else {
      setGoal_Weight(event.target.value);
      document.getElementById("goal_weight_label").style = classes.height;
    }
  };

  const handlePasswordChange = (event) => {
    let isError = validatePassword(event.target.value) ? false : true;
    handleErrorCheck(event.target.id, isError);
    if (!isError) {
      setUserPassword(event.target.value);
    }
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
        value={FirstName}
        onChange={handleFirstNameChange}
        className={classes.halfLeft}
        error={errors["first_name"]}
        onBlur={handleFirstNameChange}
      />
      <TextField
        required
        id="last_name"
        label="Last Name"
        value={LastName}
        onChange={handleLastNameChange}
        className={classes.halfRight}
        error={errors["last_name"]}
        onBlur={handleLastNameChange}
      />
      <FormControl required className={classes.gender}>
        <InputLabel id="gender_label">Gender</InputLabel>
        <Select
          id="gender"
          value={User_Gender}
          label="gender_label"
          onChange={handleUserGenderChange}
          error={errors["gender"]}
          onBlur={handleUserGenderChange}
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
          value={User_Height_Ft}
          onChange={handleUserHeightFtChange}
          error={errors["height_ft"]}
          endAdornment={<InputAdornment position="end">ft</InputAdornment>}
          onBlur={handleUserHeightFtChange}
        />
      </FormControl>
      <FormControl required className={classes.height}>
        <InputLabel id="height_in_label">Height</InputLabel>
        <Input
          id="height_in"
          label="Height"
          value={User_Height_In}
          onChange={handleUserHeightInChange}
          error={errors["height_in"]}
          onBlur={handleUserHeightInChange}
          endAdornment={<InputAdornment position="end">in</InputAdornment>}
        />
      </FormControl>
      <TextField
        required
        id="age"
        label="Age"
        value={User_Age}
        onChange={handleUserAgeChange}
        error={errors["age"]}
        className={classes.halfLeft}
        onBlur={handleUserAgeChange}
      />
      <FormControl required className={classes.halfRight}>
        <InputLabel id="weight_label">Weight</InputLabel>
        <Input
          id="weight"
          value={Current_Weight}
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
          value={Activity_Level}
          onChange={handleActivity_LevelChange}
          error={errors["activity_level"]}
          onBlur={handleActivity_LevelChange}
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
          value={Goal_Weight}
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
        value={UserLogin}
        onChange={handleUsernameChange}
        error={errors["username_reg"]}
        onBlur={handleUsernameChange}
        fullWidth
      />
      <TextField
        required
        id="password_reg"
        label="Password"
        value={UserPassword}
        onChange={handlePasswordChange}
        error={errors["password_reg"]}
        onBlur={handlePasswordChange}
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
