import React, { Component } from 'react';
import axios from 'axios';
import '../css/login.css';
import thermometerImg from '../img/thermo.png';

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
        console.log(res);
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
    const { login, passwd } = this.state;
    const errorHideCSS = { opacity: 0, pointerEvents: 'none' };
    return (
      <div id="login">
        <div id="cont">
          <form action="/auth/login" method="POST">
            <h4>Login</h4>
            <input
              type="text"
              name="login"
              value={login}
              onChange={this.handleInput}
            />
            <h4>Hasło</h4>
            <input
              type="password"
              name="passwd"
              value={passwd}
              onChange={this.handleInput}
            />
            <button type="submit" onClick={this.submit}>
              Wyslij
            </button>

            <p style={this.state.isError ? null : errorHideCSS} id="alert">
              Błędne dane logowania
            </p>
          </form>
          <div id="pic">
            <img alt="" src={thermometerImg} />
            <p>Termometry - Handi Systems</p>
          </div>
        </div>
      </div>
    );
  }
}
