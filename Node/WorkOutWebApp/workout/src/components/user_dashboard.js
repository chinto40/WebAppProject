import React, { useEffect } from "react";
import {
  Container,
  CardContent,
  Card,
  Grid,
  Typography,
  Button,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactMinimalPieChart from "react-minimal-pie-chart";
import { mergeClasses } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { AppContext } from "../context";
import { getSingleUserStats } from "../utils/fetchRequest";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(2),
    textAlign: "left",
  },
  textLeft: {
    marginTop: theme.spacing(2),
    WebkitTextFillColor: "#47443B",
    textAlign: "left",
  },
  textCenter: {
    marginTop: theme.spacing(2),
    WebkitTextFillColor: "#47443B",
    textAlign: "center",
  },
  textOrange: {
    WebkitTextFillColor: "#E38627",
    textAlign: "left",
  },
  buttonRight: {
    marginLeft: "auto",
  },
}));

export default function UserDashboard() {
  const classes = useStyles();
  const { currentUsername } = React.useContext(AppContext);
  // These are the old variables
  //const currWeight = 250;
  //const goalWeight = 220;
  //const currCaloriesLogged = 1440;
  //const goalCalories = 2000;

  // These are the new variables
  const [currWeight, setCurrWeight] = React.useState();
  const [goalWeight, setGoalWeight] = React.useState();
  const [currCaloriesLogged, setCurrCaloriesLogged] = React.useState();
  const [goalCalories, setGoalCalories] = React.useState();

  const [logWeightOpen, setLogWeightOpen] = React.useState(false);
  const [logCaloriesOpen, setLogCaloriesOpen] = React.useState(false);
  const [selectedDateWeightLog, setSelectedDateWeightLog] = React.useState(
    new Date()
  );
  const [selectedDateCalorieLog, setSelectedDateCalorieLog] = React.useState(
    new Date()
  );

  const getUserInfo = async () => {
    const stats = JSON.parse(JSON.stringify(await getSingleUserStats()));
    console.log(Object.entries(stats));
    setCurrWeight(stats["Current_Weight"]);
    setGoalWeight(stats["Goal_Weight"]);
    setCurrCaloriesLogged(stats["Current_Calories"]);
    setGoalCalories(stats["Goal_Calories"]);
    //setWorkouts(workouts);
    //setNumWorkouts(Object.keys(workouts).length);
  };

  useEffect(() => {
    getUserInfo();
    alert("After getUserInfo call");
  }, []);

  const percentageCalories = (currCaloriesLogged / goalCalories) * 100;

  const handleLogWeightOpen = () => {
    setLogWeightOpen(true);
  };

  const handleLogWeightClose = () => {
    setLogWeightOpen(false);
  };

  const handleLogCaloriesOpen = () => {
    setLogCaloriesOpen(true);
  };

  const handleLogCaloriesClose = () => {
    setLogCaloriesOpen(false);
  };

  const handleCalorieDateChange = (date) => {
    selectedDateCalorieLog(date);
  };

  const handleWeightDateChange = (date) => {
    selectedDateWeightLog(date);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid
        container
        spacing={3}
        className={classes.card}
        direction="row"
        justify="flex-start"
        align-items="flex-start"
      >
        <Grid item xs>
          <Card>
            <CardContent>
              <ReactMinimalPieChart
                animate={false}
                animationDuration={500}
                animationEasing="ease-out"
                cx={50}
                cy={50}
                data={[
                  {
                    color: "#E38627",
                    value: percentageCalories,
                  },
                ]}
                label
                labelPosition={0}
                labelStyle={{
                  fontFamily: "sans-serif",
                  fontSize: "25px",
                }}
                lengthAngle={360}
                lineWidth={20}
                onClick={undefined}
                onMouseOut={undefined}
                onMouseOver={undefined}
                paddingAngle={0}
                radius={50}
                rounded={false}
                startAngle={0}
                totalValue={100}
                viewBoxSize={[100, 100]}
              />
              <Typography
                variant="h6"
                className={classes.textCenter}
                textAlign="center"
              >
                Percentage of Daily Calories Consumed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card>
            <CardContent>
              <Typography variant="h5" className={classes.textLeft}>
                Current Weight
              </Typography>
              <Typography variant="h3" className={classes.textOrange}>
                {currWeight}
              </Typography>
              <Typography variant="h5" className={classes.textLeft}>
                Goal Weight
              </Typography>
              <Typography variant="h3" className={classes.textOrange}>
                {goalWeight}
              </Typography>
              <CardActions>
                <Button
                  onClick={handleLogWeightOpen}
                  className={classes.buttonRight}
                >
                  Log Weight
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs>
          <Card>
            <CardContent>
              <Typography variant="h5" className={classes.textLeft}>
                Current Calories Logged
              </Typography>
              <Typography variant="h3" className={classes.textOrange}>
                {currCaloriesLogged}
              </Typography>
              <Typography variant="h5" className={classes.textLeft}>
                Goal Calories/Day
              </Typography>
              <Typography variant="h3" className={classes.textOrange}>
                {goalCalories}
              </Typography>
              <CardActions>
                <Button
                  onClick={handleLogCaloriesOpen}
                  className={classes.buttonRight}
                >
                  Log Calories
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={logWeightOpen} close={handleLogWeightClose}>
        <DialogTitle id="weight-dialog-title" padding={2}>
          Log Weight
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-weight"
              label="Date"
              value={selectedDateWeightLog}
              onChange={handleWeightDateChange}
              KeyboardButtonProps={{
                "aria-label": "change weight date",
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField id="weight" label="Weight" fullWidth></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogWeightClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogWeightClose} color="primary">
            Log
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={logCaloriesOpen} close={handleLogCaloriesClose}>
        <DialogTitle id="calorie-dialog-title">Log Calories</DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-calories"
              label="Date"
              value={selectedDateCalorieLog}
              onChange={handleCalorieDateChange}
              KeyboardButtonProps={{
                "aria-label": "change calorie date",
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField id="calories" label="Calories" fullWidth></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogCaloriesClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogCaloriesClose} color="primary">
            Log
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
