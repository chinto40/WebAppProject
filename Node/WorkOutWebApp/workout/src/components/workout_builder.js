import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardActions,
  CardActionArea,
  Grid,
  Button,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  Input,
  DialogActions,
  CardMedia,
  Slider,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { getAllTheWorkouts } from "../utils/fetchRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  card: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: 300,
    width: "100%",
  },
  icon: {
    height: "50%",
    width: "50%",
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  slider: {
    paddingTop: theme.spacing(4),
    height: 300,
  },
  text: {
    paddingTop: theme.spacing(3),
  },
}));

export default function WorkoutBuilder() {
  const classes = useStyles();
  const [numWorkouts, setNumWorkouts] = React.useState(null);
  const [allWorkouts, setAllWorkouts] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [workoutsSelected, setWorkoutsSelected] = React.useState([]);
  const [workoutToAdd, setWorkoutToAdd] = React.useState(null);
  const [workoutError, setWorkoutError] = React.useState();
  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(undefined);
  const [severity, setSeverity] = React.useState("");

  const images = {
    "Arm Chop": require("./images/workouts/Arms_ArmChop.PNG"),
    "Raised Arm Circles": require("./images/workouts/Arms_RaisedArmCircles.PNG"),
    "Seal Jacks": require("./images/workouts/Arms_SealJacks.PNG"),
    "Pull Ups": require("./images/workouts/Back_PullUps.PNG"),
    Burpees: require("./images/workouts/Cardio_Burpees.PNG"),
    Climbers: require("./images/workouts/Cardio_Climbers.PNG"),
    "High Knee": require("./images/workouts/Cardio_HighKnee.PNG"),
    "Jumping Jacks": require("./images/workouts/Cardio_JumpingJacks.PNG"),
    "Side Kicks": require("./images/workouts/Cardio_SideKicks.PNG"),
    "Chest Expansions": require("./images/workouts/Chest_ChestExpansions.PNG"),
    "Close Grip Push Ups": require("./images/workouts/Chest_CloseGripPushUps.PNG"),
    "Push Ups": require("./images/workouts/Chest_PushUps.PNG"),
    "Shoulder Taps": require("./images/workouts/Chest_ShoulderTaps.PNG"),
    Crunches: require("./images/workouts/Core_Crunches.PNG"),
    "Flutter Kicks": require("./images/workouts/Core_FlutterKicks.PNG"),
    "Leg Raises": require("./images/workouts/Core_LegRaises.PNG"),
    Planks: require("./images/workouts/Core_Planks.PNG"),
    Buttkicks: require("./images/workouts/LowerBody_Buttkicks.PNG"),
    "Hops On The Spot": require("./images/workouts/LowerBody_HopsOnTheSpot.PNG"),
    "Jumping Lunges": require("./images/workouts/LowerBody_JumpingLunges.PNG"),
    "Jumping Squats": require("./images/workouts/LowerBody_JumpingSquats.PNG"),
    Lunges: require("./images/workouts/LowerBody_Lunges.PNG"),
    "Side To Side Lunges": require("./images/workouts/LowerBody_SideToSideLunges.PNG"),
    Squats: require("./images/workouts/LowerBody_Squats.PNG"),
    "Wall Sit": require("./images/workouts/LowerBody_WallSit.PNG"),
    "Calf Raises": require("./images/workouts/LowerBody(Calfs)_CalfRaises.PNG"),
    "Donkey Kicks": require("./images/workouts/LowerBody(Legs)_DonkeyKicks.PNG"),
    "Overhead Punches": require("./images/workouts/Shoulder_OverheadPunches.PNG"),
  };

  const getWorkouts = async () => {
    let allTheWorkouts = JSON.parse(JSON.stringify(await getAllTheWorkouts()));
    setAllWorkouts(allTheWorkouts);
    setNumWorkouts(Object.keys(allWorkouts).length);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.value === "") {
      setWorkoutError(true);
      document.getElementById("workout_label").style.color = "red";
    } else {
      setWorkoutError(false);
      setWorkoutToAdd(Number(event.target.value));
      document.getElementById("workout_label").style = classes.slider;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWorkout = () => {
    if (workoutError) {
      setMessage("Please select a workout.");
      setSeverity("error");
      openSnackbar();
    } else {
      let newSelected = workoutsSelected;
      newSelected.push(workoutToAdd);
      setWorkoutsSelected(newSelected);
      setWorkoutToAdd(null);
      handleClose();
    }
  };

  const CreateCard = ({ workoutName }) => {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          {workoutName === "Add" ? (
            <Card className={classes.card}>
              <CardActionArea>
                <AddIcon className={classes.icon} onClick={handleClickOpen} />
              </CardActionArea>
            </Card>
          ) : (
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia>
                  <img className={classes.media} src={images[workoutName]} />
                </CardMedia>
              </CardActionArea>
              <CardActions>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          )}
        </Grid>
        {workoutName === "Add" ? null : (
          <Grid item xs={1} className={classes.slider}>
            <Typography className={classes.text} id="rest-slider" gutterBottom>
              Rest
            </Typography>
            <Slider
              orientation="vertical"
              defaultValue={4}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              aria-labelledby="rest-slider"
              step={1}
              min={0}
              max={12}
              valueLabelDisplay="on"
            />
          </Grid>
        )}
      </React.Fragment>
    );
  };

  const valueLabelFormat = (val) => {
    let text;
    switch (val) {
      case 0:
        text = "00:00";
        break;
      case 1:
        text = "00:15";
        break;
      case 2:
        text = "00:30";
        break;
      case 3:
        text = "00:45";
        break;
      case 4:
        text = "01:00";
        break;
      case 5:
        text = "01:15";
        break;
      case 6:
        text = "01:30";
        break;
      case 7:
        text = "01:45";
        break;
      case 8:
        text = "02:00";
        break;
      case 9:
        text = "02:15";
        break;
      case 10:
        text = "02:30";
        break;
      case 11:
        text = "02:45";
        break;
      case 12:
        text = "03:00";
        break;
    }

    return text;
  };

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={4} justify="center">
        <Grid container item s spacing={4}>
          {workoutsSelected.length > 0
            ? workoutsSelected.map((val) => (
                <CreateCard workoutName={allWorkouts[val]["Workout_Name"]} />
              ))
            : null}
          <CreateCard workoutName={"Add"} />
        </Grid>
      </Grid>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Select Workout to Add</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="workout_label" htmlFor="workouts-dialog">
                Workout
              </InputLabel>
              <Select
                native
                label="workout_label"
                value={workoutToAdd}
                onChange={handleChange}
                onBlur={handleChange}
                error={workoutError}
                input={<Input id="workouts-dialog" />}
              >
                <option value=""></option>
                {Object.keys(allWorkouts).map((key) => (
                  <option value={key}>
                    {allWorkouts[key]["Workout_Name"]}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddWorkout} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
