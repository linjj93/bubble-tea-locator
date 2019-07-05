import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
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
          <Route path="/drink-diary" component={Tracker} />
          <Route path="/register" component={Register} />

          <Route component={PageNotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
