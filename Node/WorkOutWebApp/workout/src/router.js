import React, { Component, useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import WorkoutBuilder from "./components/workout_builder";
import Workouts from "./components/workouts";
import UserDashboard from "./components/user_dashboard";
import HomePage from "./components/landing_page";
import { AppContext } from "./context";
import LoginDialog from "./components/login/loginDialog";

const Router = (props) => {
  return (
    <Switch>
      <PrivateRoute
        exact={true}
        path="/workoutBuilder"
        component={WorkoutBuilder}
      ></PrivateRoute>
      <PrivateRoute
        exact={true}
        path="/workouts"
        component={Workouts}
      ></PrivateRoute>
      <PrivateRoute
        exact={true}
        path="/userDashboard"
        component={UserDashboard}
      ></PrivateRoute>
      <Route exact={true} path="/" component={HomePage}></Route>
    </Switch>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isUserLoggedIn, setIsUserLoggedIn } = React.useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    ></Route>
  );
};

export default Router;
