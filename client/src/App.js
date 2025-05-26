import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthState from "./context/auth/AuthState";
import Navigation from "./components/core/Layout/Navigation";
import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Shop from "./components/core/Shop";
import Biz from "./components/core/Biz/Biz";
import HoursForm from "./components/core//Biz/HoursForm";
import AddBizForm from "./components/core/Biz/AddBizForm";

import AdminDashboard from "./components/admin/AdminDashboard";
import UserDashboard from "./components/user/UserDashboard";
import LoginSuccess from "./components/auth/LoginSuccess";

const App = () => {
  return (
    <AuthState>
      <BrowserRouter>
        <Navigation />
        <Route exact path="/" component={Shop}></Route>
        <Switch>
          <Route exact path="/signup" component={Signup}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/biz/:bizId" component={Biz}></Route>
          <Route exact path="/post/biz" component={AddBizForm}></Route>
          <Route exact path="/post/hours/:bizId" component={HoursForm}></Route>
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          ></AdminRoute>
          <PrivateRoute
            exact
            path="/user/messages"
            component={UserDashboard}
          ></PrivateRoute>
          <Route
            path="/authenticate/facebook/"
            component={LoginSuccess}
          ></Route>
        </Switch>
      </BrowserRouter>
    </AuthState>
  );
};

export default App;
