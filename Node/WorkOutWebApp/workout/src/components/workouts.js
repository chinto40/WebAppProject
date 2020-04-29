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
    //maxHeight: 200,
    //maxWidth: 200,
  },
}));

const Workouts = () => {
  const classes = useStyles();
  const [numWorkouts, setNumWorkouts] = React.useState(null);
  const [workouts, setWorkouts] = React.useState({});

  const getWorkouts = async () => {
    const workouts = JSON.parse(JSON.stringify(await getAllTheWorkouts()));
    setWorkouts(workouts);
    setNumWorkouts(Object.keys(workouts).length);
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

  const CreateCard = ({ workoutName }) => {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia>
                <img className={classes.media} src={images[workoutName]} />
              </CardMedia>
              {/* <CardContent>
                <Typography variant="h5" component="h2">
                  {workoutName}
                </Typography>
              </CardContent> */}
            </CardActionArea>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid>

        {/* <Grid item xs>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                image={require("./images/landing_page_1.jpg")}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Workout Name
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                image={require("./images/landing_page_1.jpg")}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  Workout Name
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid> */}
      </React.Fragment>
    );
  };

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={4} justify="center">
          <Grid container item s spacing={4}>
            {Object.keys(workouts).map((key) => (
              <CreateCard workoutName={workouts[key]["Workout_Name"]} />
            ))}
          </Grid>
          {/* {numWorkouts > 0 ? (
            <Grid container item xs={24} spacing={4}>
              <CreateCard />
              <CreateCard />
              <CreateCard />
            </Grid>
          ) : null}
          <Grid container item xs={24} spacing={4}>
            <CreateCard />
            <CreateCard />
            <CreateCard />
          </Grid>
          <Grid container item xs={24} spacing={4}>
            <CreateCard />
            <CreateCard />
            <CreateCard />
          </Grid> */}
        </Grid>
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
LowerBody(calfs): 7
LowerBody(Legs): 8
Shoulder: 9
*/
