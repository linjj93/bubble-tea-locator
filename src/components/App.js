import React from "react";
import Login from "./Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import BubbleTeaLocator from "./BubbleTeaLocator";
import Tracker from "./Tracker";
import PageNotFound from "./PageNotFound";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/find-a-shop" component={BubbleTeaLocator} />
          <Route path="/drinking-history" component={Tracker} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
