import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import FBLogin from "./components/FBLogin";
import LoginSuccess from "./components/LoginSuccess";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={FBLogin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/admin/dashboard" component={AdminDashboard}></Route>
        <Route exact path="/user/dashboard" component={UserDashboard}></Route>
        <Route path="/authenticate/facebook/" component={LoginSuccess}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
