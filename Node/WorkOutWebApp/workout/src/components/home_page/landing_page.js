import React from "react";
import MenuBar from "./menu_bar";
import { Container } from "@material-ui/core";

export default function HomePage() {
  return (
    <Container maxWidth="lg">
      <MenuBar />
      <header className="App-header">
        <p>Get Started Today</p>
        {/* <p>The State is: => {this.state.data} End</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.buttonOnAction}>Click Me!!!</button>
          <p> </p> */}
      </header>
    </Container>
  );
}
