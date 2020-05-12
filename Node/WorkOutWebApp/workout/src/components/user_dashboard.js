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
import {
  getSingleUserStats,
  addCalorieLog,
  setUsersWeight,
} from "../utils/fetchRequest";
import { validateCalories, validateWeight } from "../utils/validator";

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
  const [currWeight, setCurrWeight] = React.useState();
  const [goalWeight, setGoalWeight] = React.useState();
  const [currCaloriesLogged, setCurrCaloriesLogged] = React.useState();
  const [goalCalories, setGoalCalories] = React.useState();

  const [logWeightOpen, setLogWeightOpen] = React.useState(false);
  const [logCaloriesOpen, setLogCaloriesOpen] = React.useState(false);

  const [selectedDateWeightLog, setSelectedDateWeightLog] = React.useState(
    new Date()
  );
  const [weightToLog, setWeightToLog] = React.useState();
  const [selectedDateCalorieLog, setSelectedDateCalorieLog] = React.useState(
    new Date()
  );
  const [caloriesToLog, setCaloriesToLog] = React.useState();

  const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);
  const [message, setMessage] = React.useState(undefined);
  const [severity, setSeverity] = React.useState("");
  const [percentageCalories, setPercentageCalories] = React.useState();

  const getUserInfo = async () => {
    const stats = JSON.parse(
      await getSingleUserStats({ UserLogin: currentUsername })
    );
    alert("In getUserInfo: " + stats["Current_Calories"]);
    setCurrWeight(stats["Current_Weight"]);
    setGoalWeight(stats["Goal_Weight"]);
    setCurrCaloriesLogged(stats["Current_Calories"]);
    setGoalCalories(stats["Goal_Calories"]);
    setPercentageCalories(
      (stats["Current_Calories"] / stats["Goal_Calories"]) * 100
    );
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const openSnackbar = () => {
    setIsSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setIsSnackbarOpen(false);
  };

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

  const handleLogWeight = () => {
    if (validateWeight(weightToLog) !== true) {
      setMessage("Please enter valid information for all fields.");
      setSeverity("error");
      openSnackbar();
    } else {
      let logInfo = {
        UserName: currentUsername,
        date: selectedDateWeightLog,
        newWeight: weightToLog,
      };
      /* TODO: setCurrentUserWeight needs to be updated in DataManipulation
         parameters need to be updated to have the fields UserName, date, newWeight
         need to create a table in database for User_Weight logs
         need to make sure logs in User_Weight are updated in User_Stats.Current_Weight */
      setCurrWeight(logInfo.newWeight);
      setUsersWeight(logInfo);
      // Will current weight automatically be updated? If not, do that here.
      // make sure the goal calories gets updated
      handleLogWeightClose();
    }
  };

  const handleLogCalories = () => {
    if (validateCalories(caloriesToLog) !== true) {
      setMessage("Please enter valid information for all fields.");
      setSeverity("error");
      openSnackbar();
    } else {
      let logInfo = {
        UserName: currentUsername,
        date: selectedDateCalorieLog,
        calories: caloriesToLog,
      };
      /* TODO: setUserCalories needs to be updated in DataManipulation
         else branch needs to be completed
         need to make sure logs in User_Calories are updated in User_Stats.Current_Calories */
      alert(logInfo.calories);
      addCalorieLog(logInfo);
      // Will current calories automatically be updated? If not, do that here.
      // setPercentageCalories((currCaloriesLogged / goalCalories) * 100);
      handleLogCaloriesClose();
    }
  };

  const handleCalorieDateChange = (event) => {
    selectedDateCalorieLog(event.target.value);
  };

  const handleCalorieLogChange = (event) => {
    setCaloriesToLog(event.target.value);
    if (validateCalories(event.target.value) !== true) {
      document.getElementById("calories").style.color = "red";
    } else {
      document.getElementById("calories").style = classes.root;
    }
  };

  const handleWeightDateChange = (event) => {
    selectedDateWeightLog(event.target.value);
  };

  const handleWeightLogChange = (event) => {
    setWeightToLog(event.target.value);
    if (validateWeight(event.target.value) !== true) {
      document.getElementById("weight").style.color = "red";
    } else {
      document.getElementById("weight").style = classes.root;
    }
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
          <TextField
            id="weight"
            label="Weight"
            value={weightToLog}
            onChange={handleWeightLogChange}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogWeightClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogWeight} color="primary">
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
          <TextField
            id="calories"
            label="Calories"
            value={caloriesToLog}
            onChange={handleCalorieLogChange}
            fullWidth
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogCaloriesClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogCalories} color="primary">
            Log
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
