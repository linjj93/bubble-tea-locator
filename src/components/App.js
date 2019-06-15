import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./Home";
import BubbleTeaLocator from "./BubbleTeaLocator";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/bubble-tea" component={BubbleTeaLocator} />
    </Router>
  );
}

export default App;
