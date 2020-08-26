import React from "react";
import Navigation from "./Navigation";
import { Jumbotron } from "react-bootstrap";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Navigation />
      <Jumbotron className="text-dark mt-4 mx-3">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </Jumbotron>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;