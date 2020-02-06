import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

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
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <TextField
          autofocus
          margin="dense"
          id="username_login"
          label="Username"
          fullWidth
        />
        <TextField
          autofocus
          margin="dense"
          id="password_login"
          label="Password"
          fullWidth
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TextField
          autofocus
          margin="dense"
          id="first_name"
          label="First Name"
          fullWidth
        />
        <TextField
          autofocus
          margin="dense"
          id="last_name"
          label="Last Name"
          fullWidth
        />
        <TextField
          autofocus
          margin="dense"
          id="username_reg"
          label="Username"
          fullWidth
        />
        <TextField
          autofocus
          margin="dense"
          id="password_reg"
          label="Password"
          fullWidth
        />
      </TabPanel>
    </div>
  );
}
