import React from "react";
import "./App.scss";
import { Button } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Button variant="primary">Click ME</Button>
      <Button variant="secondary">Click ME</Button>
      <Button variant="success">Click ME</Button>
      <Button variant="info">Click ME</Button>
      <Button variant="warning">Click ME</Button>
      <Button variant="danger">Click ME</Button>
    </div>
  );
}

export default App;
