import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import BubbleTeaLocator from "./Find-A-Shop/BubbleTeaLocator";
import Tracker from "./Drink-Tracker/Tracker";
import PageNotFound from "./PageNotFound";
import { createBrowserHistory } from "history";
const appHistory = createBrowserHistory();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Login history={appHistory} {...props} />}
        />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/find-a-shop" component={BubbleTeaLocator} />
        <Route path="/drink-tracker" component={Tracker} />
        <Route path="/register" component={Register} />
        <Route component={PageNotFound} />
      </Switch>
    );
  }
}

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
