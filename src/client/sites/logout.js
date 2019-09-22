import React from 'react';
import '../css/logout.css';
import axios from 'axios';

export default function Logout() {
  axios.get('/auth/logout').then(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  });
  return <div id="logout">Wylogowano</div>;
}
