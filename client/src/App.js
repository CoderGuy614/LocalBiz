import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FBLogin from "./components/FBLogin";
import LoginSuccess from "./components/LoginSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={FBLogin}></Route>
        <Route path="/authenticate/facebook" component={LoginSuccess}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
