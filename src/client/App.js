import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/app.css";
import Home from "./sites/home";
import LoginRoute from "./sites/login";
import Logout from "./sites/logout";
import AuthorizedComp from ".//modules/authorizedComp";
export default class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={LoginRoute} />
            <Route path="/logout" exact component={Logout} />
            <AuthorizedComp>
              <Route path="/" exact component={Home} />
            </AuthorizedComp>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
