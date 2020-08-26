import React from "react";
import Nav from "./Nav";
import { Jumbotron } from "react-bootstrap";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Nav />
      <Jumbotron>
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </Jumbotron>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
