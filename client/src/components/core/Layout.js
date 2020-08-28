import React from "react";
import Navigation from "./Navigation";
import { Jumbotron, Image } from "react-bootstrap";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  photo,
  user,
  children,
}) => {
  return (
    <div>
      <Navigation />
      <Jumbotron className="text-dark mt-4 mx-3">
        <div className="d-flex">
          <div>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
          </div>
          <div className="ml-auto">
            {photo && (
              <img
                className="roundedCircle"
                style={{ maxWidth: "150px" }}
                src={photo}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="user-profile ">
          {/* <Image className="roundedCircle" src={user.avatar} /> */}
        </div>
      </Jumbotron>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
