import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from './MainContainer.module.scss';
import Login from '../../components/userStart/Login.jsx';
import Signup from '../../components/userStart/Signup.jsx';

const MainContainer = () => {
  const [login, setLogin] = useState(false);
  const [haveAccount, setHaveAccount] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameInputValue = document.getElementById('username').value;
    document.getElementById('username').value = '';
    const passwordInputValue = document.getElementById('password').value;
    document.getElementById('password').value = '';

    fetch('http://localhost:3000/authentication/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameInputValue,
        password: passwordInputValue,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log('result from login request: ', result);
        setLogin(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //functino to handle showing the signup page
  const handleHaveAccount = () => setHaveAccount(false);

  //function to handle sign-up if username was not already taken
  const handleSigned = (e) => {
    e.preventDefault();
    const nameValue = document.getElementById('user').value;
    document.getElementById('user').value = '';
    const passwordValue = document.getElementById('psw').value;
    document.getElementById('psw').value = '';

    fetch('http://localhost:3000/authentication/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: nameValue,
        password: passwordValue,
      }),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log('result from signup request: ', result);
        setHaveAccount(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return login ? (
    <div className={styles.container}>
      <Sidebar />
    </div>
  ) : haveAccount ? (
    <div className={styles.container}>
      <Login handleLogin={handleLogin} handleHaveAccount={handleHaveAccount} />
    </div>
  ) : (
    <div className={styles.container}>
      <Signup handleSigned={handleSigned} />
    </div>
  );
};

export default MainContainer;
