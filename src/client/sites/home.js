import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthorizedComp from '../modules/authorizedComp';

export default class Home extends Component {
  state = {};

  render() {
    return (
      <>
        <AuthorizedComp>
          <h1>HOME</h1>
          <Link to="/login"> go </Link>
        </AuthorizedComp>
      </>
    );
  }
}
