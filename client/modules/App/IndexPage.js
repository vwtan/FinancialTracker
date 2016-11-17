import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import callApi from '../../util/apiCaller';
import styles from './App.scss';

class IndexPage extends Component {
  handleClick() {
    const username = this.username;
    const password = this.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    callApi('login', 'post', { info: creds });
  }
  handleClick2() {
    const username = this.username;
    const password = this.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    callApi('register', 'post', { info: creds });
  }
  render() {
    const t = this;
    return (
      <div className={styles.appPage}>
        <input className={styles.input} type="text" ref={(c) => { t.username = c; }} placeholder="Username" /><br />
        <input className={styles.input} type="password" ref={(c) => { t.password = c; }} placeholder="Password" />
        <p>
          <button className={styles.btn} onClick={() => { t.handleClick(); }}>Login</button>
          <button className={styles.btn} onClick={() => { t.handleClick2(); }}>Register</button>
        </p><br />
      </div>
    );
  }
}
export default IndexPage;
