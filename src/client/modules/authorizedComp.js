import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class AuthorizedComp extends Component {
  constructor(props) {
    super(props);
    this.state = { authorized: undefined };
  }

  componentDidMount() {
    this.authorizeJWT();
  }

  authorizeJWT() {
    axios
      .get('/auth/token/')
      .then((res) => {
        if (!res.data.success) {
          this.setState({ authorized: false });
        } else if (res.data.success) {
          this.setState({
            authorized: true
          });
        }
      })
      .catch(() => {
        // eslint-disable-next-line
        this.setState({
          authorized: false
        });
      });
  }

  render() {
    const { authorized } = this.state;
    if (authorized === undefined) {
      return <div>Loading...</div>;
    }
    if (authorized === false) {
      return <Redirect to="/login" />;
    }
    // eslint-disable-next-line
    return <>{this.props.children}</>;
  }
}
