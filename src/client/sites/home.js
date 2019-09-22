import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <h1>HOME</h1>
        <Link to="/login"> go </Link>
      </>
    );
  }
}
