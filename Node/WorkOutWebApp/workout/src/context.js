import React, { createContext } from "react";

export const AppContext = React.createContext();

export const callHelloBackend = async () => {
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
  //this.setState({ data: body.Hello });
  alert("after changes" + body.Hello);
  //return body;
};

const AppContextProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
  const ctx = {
    isUserLoggedIn: isUserLoggedIn,
    setIsUserLoggedIn: setIsUserLoggedIn,
  };

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
