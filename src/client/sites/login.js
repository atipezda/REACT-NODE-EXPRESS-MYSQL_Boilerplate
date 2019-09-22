import React, { Component } from 'react';
import axios from 'axios';
import '../css/login.css';

export default class LoginRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', passwd: '', isError: false };
  }

  componentDidMount() {
    this.authorizeJWT();
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isError: false
    });
  };

  submit = (e) => {
    e.preventDefault();
    const { login, passwd } = this.state;
    axios
      .post('/auth/login', {
        login,
        passwd
      })
      .then((res) => {
        if (res.data.success) {
          console.log('logged in');
          // eslint-disable-next-line
          this.props.history.push('/');
        } else {
          this.setState({ isError: true });
        }
      });
  };

  authorizeJWT() {
    axios
      .get('/auth/token')
      .then((res) => {
        if (res.data.success) {
          // eslint-disable-next-line
          this.props.history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { login, passwd, isError } = this.state;
    const errorHideCSS = { maxHeight: '0', pointerEvents: 'none' };
    return (
      <div id="login">
        <div id="cont">
          <h4>App Name</h4>
          <form action="/auth/login" method="POST">
            <input
              placeholder="Login"
              type="text"
              name="login"
              value={login}
              required
              onChange={this.handleInput}
            />
            <input
              placeholder="Hasło"
              type="password"
              name="passwd"
              value={passwd}
              required
              onChange={this.handleInput}
            />
            <button type="submit" onClick={this.submit}>
              zaloguj
            </button>

            <div style={isError ? null : errorHideCSS} id="alert">
              <p>Błędne dane logowania</p>
            </div>
          </form>
          <div id="pic">
            <p>Handi Systems solution</p>
          </div>
        </div>
      </div>
    );
  }
}
