import React from "react";
import { withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../../auth/apiAuth";
import { Navbar, Nav } from "react-bootstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#9ad1d4" };
  } else {
    return { color: "#ffffff" };
  }
};

const Navigation = ({ history }) => {
  return (
    <Navbar collapseOnSelect expand="md" bg="secondary">
      <Navbar.Brand className="text-white" href="/">
        LocalBiz
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link style={isActive(history, "/")} href="/">
            Home
          </Nav.Link>
          <Nav.Link style={isActive(history, "/login")} href="/login">
            Login
          </Nav.Link>
          <Nav.Link style={isActive(history, "/signup")} href="/signup">
            Sign up
          </Nav.Link>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <Nav.Link
              href="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              Dashboard
            </Nav.Link>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Nav.Link
              href="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard
            </Nav.Link>
          )}
          {isAuthenticated() && (
            <Nav.Link
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Sign Out
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
