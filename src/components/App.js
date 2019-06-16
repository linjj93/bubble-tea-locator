import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import BubbleTeaLocator from "./BubbleTeaLocator";
import PageUnderConstruction from "./PageUnderConstruction";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/bubble-tea" component={BubbleTeaLocator} />
        <Route path="/bargain-shop" component={PageUnderConstruction} />
        <Route path="/arcade" component={PageUnderConstruction} />
        <Route path="/cinema" component={PageUnderConstruction} />
        <Route path="/supermarket" component={PageUnderConstruction} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
