import React, { useEffect } from "react";
import MenuBar from "./menu_bar";
import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Drawer,
  ListItem,
  FormControlLabel,
  Switch,
  FormGroup,
  ListItemIcon,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getAllTheWorkouts } from "../utils/fetchRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  card: {
    width: "100%",
    heigt: "100%",
  },
  media: {
    height: 300,
    width: "100%",
  },
  list: {
    width: "auto",
    padding: theme.spacing(4),
  },
  labels: {
    width: "auto",
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  leftButton: {
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
    WebkitTextFillColor: (theme.color = "#8ABD00"),
  },
}));

const Workouts = () => {
  const classes = useStyles();
  const [numWorkouts, setNumWorkouts] = React.useState(null);
  const [allWorkouts, setAllWorkouts] = React.useState({});
  const [workouts, setWorkouts] = React.useState({});
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const [armsSelected, setArmsSelected] = React.useState(false);
  const [backSelected, setBackSelected] = React.useState(false);
  const [cardioSelected, setCardioSelected] = React.useState(false);
  const [chestSelected, setChestSelected] = React.useState(false);
  const [coreSelected, setCoreSelected] = React.useState(false);
  const [lowerBodySelected, setLowerBodySelected] = React.useState(false);
  const [shouldersSelected, setShouldersSelected] = React.useState(false);

  const getWorkouts = async () => {
    let allTheWorkouts = JSON.parse(JSON.stringify(await getAllTheWorkouts()));
    setAllWorkouts(allTheWorkouts);
    setNumWorkouts(Object.keys(allWorkouts).length);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

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

  const handleSelectionChange = (event) => {
    //alert("In handleSelectionChange " + event.target.checked);
    /* let newSelected = selected;
    newSelected[key] = event.target.checked;
    setSelected(newSelected); */
    switch (event.target.name) {
      case "Arms":
        setArmsSelected(event.target.checked);
        break;
      case "Back":
        setBackSelected(event.target.checked);
        break;
      case "Cardio":
        setCardioSelected(event.target.checked);
        break;
      case "Chest":
        setChestSelected(event.target.checked);
        break;
      case "Core":
        setCoreSelected(event.target.checked);
        break;
      case "Lower Body":
        setLowerBodySelected(event.target.checked);
        break;
      case "Shoulders":
        setShouldersSelected(event.target.checked);
        break;
    }
  };

  const toggleDrawer = () => {
    drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true);
  };

  const getWorkoutNameById = (workoutId) => {
    let workoutName;
    switch (workoutId) {
      case 1:
        workoutName = "Arms";
        break;
      case 2:
        workoutName = "Back";
        break;
      case 3:
        workoutName = "Cardio";
        break;
      case 4:
        workoutName = "Chest";
        break;
      case 5:
        workoutName = "Core";
        break;
      case 6:
        workoutName = "Lower Body";
        break;
      case 7:
        workoutName = "Shoulders";
        break;
    }

    return workoutName;
  };

  const handleApplyFilters = () => {
    /* iterate through selected object and filter workouts based
    on the selected muscle groups*/
    Object.filter = (obj, predicate) =>
      Object.fromEntries(Object.entries(obj).filter(predicate));
    let filtered = Object.filter(allWorkouts, filterWorkouts);
    setWorkouts(filtered);
    toggleDrawer();
  };

  const filterWorkouts = ([key, value]) => {
    let group = getWorkoutNameById(allWorkouts[key]["Workout_GroupID"]);
    if (getIsSelected(group) === true) {
      return true;
    } else {
      return false;
    }
  };

  const getIsSelected = (workoutName) => {
    let isSelected;
    switch (workoutName) {
      case "Arms":
        isSelected = armsSelected;
        break;
      case "Back":
        isSelected = backSelected;
        break;
      case "Cardio":
        isSelected = cardioSelected;
        break;
      case "Chest":
        isSelected = chestSelected;
        break;
      case "Core":
        isSelected = coreSelected;
        break;
      case "Lower Body":
        isSelected = lowerBodySelected;
        break;
      case "Shoulders":
        isSelected = shouldersSelected;
        break;
    }

    return isSelected;
  };

  const CreateCard = ({ workoutName }) => {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia>
                <img className={classes.media} src={images[workoutName]} />
              </CardMedia>
            </CardActionArea>
            {/* <CardActions>
              <Button size="small">View Details</Button>
            </CardActions> */}
          </Card>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Button
          className={classes.leftButton}
          onClick={toggleDrawer}
          marginLeft={0}
        >
          Filter
        </Button>
        <Grid container spacing={4} justify="center">
          <Grid container item s spacing={4}>
            {Object.keys(workouts).length === 0
              ? Object.keys(allWorkouts).map((key) => (
                  <CreateCard workoutName={allWorkouts[key]["Workout_Name"]} />
                ))
              : Object.keys(workouts).map((key) => (
                  <CreateCard workoutName={workouts[key]["Workout_Name"]} />
                ))}
          </Grid>
        </Grid>
        <Drawer
          anchor="left"
          className={classes.list}
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <FormLabel className={classes.labels}>Filter Options</FormLabel>
          <FormGroup className={classes.list}>
            <FormControlLabel
              control={
                <Switch
                  name="Arms"
                  checked={armsSelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Arms"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  name="Back"
                  checked={backSelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Back"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  name="Cardio"
                  checked={cardioSelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Cardio"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  name="Chest"
                  checked={chestSelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Chest"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  name="Core"
                  checked={coreSelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Core"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  name="Lower Body"
                  checked={lowerBodySelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Lower Body"
            ></FormControlLabel>
            <FormControlLabel
              control={
                <Switch
                  name="Shoulders"
                  checked={shouldersSelected}
                  onChange={handleSelectionChange}
                />
              }
              label="Shoulders"
            ></FormControlLabel>
          </FormGroup>
          <Button onClick={handleApplyFilters}>Apply</Button>
        </Drawer>
      </div>
    </Container>
  );
};

export default Workouts;

/* Here are the workout groupIDs 
Arms: 1
Back: 2
Cardio: 3
Chest: 4
Core: 5
LowerBody: 6
LowerBody(calfs): 6
LowerBody(Legs): 6
Shoulders: 7
*/
