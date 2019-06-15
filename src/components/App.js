import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./Home";
import BubbleTeaLocator from "./BubbleTeaLocator";

const NotFound = () => <div data-testid="error-page">No Page Found</div>;

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/bubble-tea" component={BubbleTeaLocator} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
