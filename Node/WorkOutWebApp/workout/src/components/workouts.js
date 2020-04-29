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

export default async function Workouts() {
  const classes = useStyles();
  const workouts = await getAllTheWorkouts();
  alert('After call: ' + JSON.stringify(workouts))
  alert(Object.entries(workouts));
  let numWorkouts = Object.entries(workouts).length;

  const CreateCard = ({ workoutName, imgPath }) => {
    return (
      <React.Fragment>
        <Grid item xs marginLeft={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                component="img"
                image={require(imgPath)}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {workoutName}
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
          {Object.entries(workouts).map((elem) => (
            <CreateCard
              name={elem.WorkoutName}
              imgPath={elem.Workout_ImagePath}
            />
          ))}
          {/* <Grid container item xs={24} spacing={4}>
            <CreateRow />
          </Grid>
          <Grid container item xs={24} spacing={4}>
            <CreateRow />
          </Grid>
          <Grid container item xs={24} spacing={4}>
            <CreateRow />
          </Grid> */}
        </Grid>
      </div>
    </Container>
  );
}

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
