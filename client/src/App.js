import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Signup";
import Signup from "./components/Signup";
import FBLogin from "./components/FBLogin";
import LoginSuccess from "./components/LoginSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FBLogin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route path="/authenticate/facebook/" component={LoginSuccess}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
