import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Homepage from "./components/Homepage";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import FBLogin from "./components/FBLogin";
import LoginSuccess from "./components/LoginSuccess";
import { isAuthenticated } from "./auth/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/login" component={Login}></Route>
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        ></AdminRoute>
        <PrivateRoute
          exact
          path="/user/dashboard"
          component={UserDashboard}
        ></PrivateRoute>
        <Route path="/authenticate/facebook/" component={LoginSuccess}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
