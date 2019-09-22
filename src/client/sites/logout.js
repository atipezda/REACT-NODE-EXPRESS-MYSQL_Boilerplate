import React from 'react';
import '../css/logout.css';

export default function Logout() {
  localStorage.removeItem('jwt');
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
  return <div id="logout">Wylogowano</div>;
}
