import React, { Component } from "react";
import "./App.css";
import LoginDialog from "./components/login/login";
import MenuBar from "./components/menu_bar";
import Workouts from "./components/workouts";
import WorkoutBuilder from "./components/workout_builder";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./components/landing_page";
import { Container } from "@material-ui/core";
import UserDashboard from "./components/user_dashboard";

class App extends Component {
  state = {};

  constructor() {
    super();

    this.state = {
      data: "False",
      first: "Jacinto",
      pass: "Molina"
    };
    // this.comp();
  }

  /*comp(){
    /*const bard = await fetch('/Hello').then(
      res=>{
        console.log(res);
        this.setState({ res })
      });
  }*/

  comp() {
    this.callHelloBackend()
      .then((req, res) => {
        alert(res.Hello);
        this.setState({ data: res.Hello }).then();
      })
      .catch(err => console.log(err));
  }

  callHelloBackend = async () => {
    const response = await fetch("/Hello"); // use fetch to connect to backend

    alert("before Parse");
    const body = await response.json();

    //console.log('Here in the body'+body.json.status)
    alert("after Parse And before Error");
    if (response.status !== 200) {
      throw Error(body.Error);
    }
    alert("after Error");
    //await response.json()
    this.setState({ data: body.Hello });
    alert("after changes" + body.Hello);
    //return body;
  };

  buttonOnAction = () => {
    alert("Start");
    this.setState({ data: "hello" });
    //this.comp()

    this.sendToServer("test");

    // calling the backend //
    //this.callHelloBackend();
    //alert("End");
  };

  sendToServer = (fetchName, stat) => {
    alert("Post");
    //fetch('/test1',this.state)
    fetch("/test", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(result => {
        console.log("Result: " + result);
        //result.json()
      })
      .then(info => {
        console.log(info);
        alert(info);
      });
  };

  render() {
    // this.comp();
    console.log("****State is: " + this.state.data);
    return (
      <BrowserRouter>
        <div className="App">
          <Container maxWidth="lg">
            <MenuBar />
          </Container>

          <Switch>
            <Route
              exact={true}
              path="/workoutBuilder"
              component={WorkoutBuilder}
            ></Route>
            <Route exact={true} path="/workouts" component={Workouts}></Route>
            <Route
              exact={true}
              path="/userDashboard"
              component={UserDashboard}
            ></Route>
            <Route exact={true} path="/" component={HomePage}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
