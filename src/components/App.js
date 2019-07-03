import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import BubbleTeaLocator from "./BubbleTeaLocator";
import Tracker from "./Tracker";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/find-a-shop" component={BubbleTeaLocator} />
        <Route path="/drinking-history" component={Tracker} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
