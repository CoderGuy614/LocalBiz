import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../../auth/Index";
import { Navbar, Nav } from "react-bootstrap";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Navigation = ({ history }) => {
  return (
    <Navbar collapseOnSelect expand="md" bg="secondary" variant="dark">
      <Navbar.Brand href="/">LocalBiz</Navbar.Brand>
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigation);
