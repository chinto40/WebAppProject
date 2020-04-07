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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: "auto",
  },
}));

export default function Workouts() {
  const classes = useStyles();

  function CreateRow() {
    return (
      <React.Fragment>
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
                <Typography variant="body2" component="p">
                  Workout Description
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
                <Typography variant="body2" component="p">
                  Workout Description
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
                <Typography variant="body2" component="p">
                  Workout Description
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small">View Details</Button>
            </CardActions>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <Container maxWidth="lg">
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid container item xs={12} spacing={2}>
            <CreateRow />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <CreateRow />
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <CreateRow />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
