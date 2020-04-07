import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { OnboardContext } from "./onboardContext";
import { callHelloBackend } from "../../context";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { isOpen, setIsOpen } = React.useContext(OnboardContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = () => {
    // call login function here
    callHelloBackend();
    setIsOpen(false);
  };

  const handleRegistration = () => {
    // call registration function here
    callHelloBackend();
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="login_registration tabs"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <TextField autofocus id="username_login" label="Username" fullWidth />
        <TextField id="password_login" label="Password" fullWidth />
        <Button
          onClick={() => {
            handleLogin();
          }}
          color="primary"
        >
          Login
        </Button>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField autofocus id="first_name" label="First Name" fullWidth />
        <TextField id="last_name" label="Last Name" fullWidth />
        <FormControl>
          <InputLabel>Height</InputLabel>
          <Input
            id="height_ft"
            label="Height"
            endAdornment={<InputAdornment position="end">ft</InputAdornment>}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <Input
            id="height_in"
            endAdornment={<InputAdornment position="end">in</InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Weight</InputLabel>
          <Input
            id="weight"
            endAdornment={<InputAdornment position="end">lbs</InputAdornment>}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Exercise Level</InputLabel>
          <Select id="exercise_level">
            <MenuItem value={0}>Little to no exercise</MenuItem>
            <MenuItem value={1}>Exercise 1 - 3 times/week</MenuItem>
            <MenuItem value={2}>Exercise 4 - 5 times/week</MenuItem>
            <MenuItem value={3}>Exercise 6 - 7 times/week</MenuItem>
          </Select>
        </FormControl>
        <TextField id="goal_weight" label="Goal Weight" fullWidth />
        <TextField id="username_reg" label="Username" fullWidth />
        <TextField id="password_reg" label="Password" fullWidth />
        <Button
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
      </TabPanel>
    </div>
  );
}
