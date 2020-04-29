import React from "react";
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
  },
  media: {
    height: "auto",
  },
}));

const Workouts = async () => {
  const classes = useStyles();
  //const [numWorkouts, setNumWorkouts] = React.useState(null);
  //const [workouts, setWorkouts] = React.useState();
  const workouts = await getAllTheWorkouts();
  //const numWorkouts =
  let i = 0;
  workouts.forEach(element => {
    alert('**Alert** :  Path: ' + workouts[i].Workout_ImagePath + ' -- WorkoutName: ' + workouts[i].Workout_Name);
    i++;
  })
  const numWorkouts = i;

  //const allWorkouts = await getAllTheWorkouts()
  alert("In getWorkouts: " + JSON.stringify(workouts));
  /* useEffect(async () => {
    
      .then((data) => setWorkouts(data))
      .then((data) => setNumWorkouts(Object.keys(workouts).length));
    alert("In getWorkouts: " + Object.keys(workouts));
    return workouts;
  }); */

  //const [workout, setWorkout] = React.useState(null);
  //const [image, setImage] = React.useState(null);
  //alert("After call: " + workouts);
  //alert(Object.entries(workouts));
  /* const [numWorkouts, setNumWorkouts] = React.useState(
    Object.keys(workouts).length
  ); */
  alert("In Workouts: " + numWorkouts);
    let x = 0;
  /*const createCard = () => {
     workouts.forEach(element  => {
      <NewCard
        workoutName={workouts[x]["Workout_Name"]}
        imgPath={workouts[x]["Workout_ImagePath"]}
      />
      x++;
     }); */
//************************************************************ */


    //let workout = workouts[key]["Workout_Name"];
    //let image = workouts[key]["Workout_ImagePath"];
    /* Object.keys(workouts[key]).map((elem) => (elem) => (
      (workout = elem === "Workout_Name" ? workouts[key][elem] : null),
      (image = elem === "Workout_ImagePath" ? workouts[key][elem] : null),
    )); */
    //alert(workout + " " + image);
 // };

  const CreateCard = ({ workoutName, imgPath }) => {
    //alert(workoutName, imgPath);
    return (
      <React.Fragment>
        <Grid item xs marginLeft={4}>
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
          {/* <Grid container item xs={24} spacing={4}>
            {Object.keys(workouts).map((key) => (
              <NewCard
                workoutName={workouts[key]["Workout_Name"]}
                imgPath={workouts[key]["Workout_ImagePath"]}
              />
            ))}
          </Grid> */}
          {numWorkouts > 0 ? (
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
          </Grid>
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
