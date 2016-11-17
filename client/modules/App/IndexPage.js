import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './App.scss';

class IndexPage extends Component {
  handleClick(event) {
    const username = this.username;
    const password = this.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
  }
  render() {
    return (
      <div className={styles.appPage}>
        <input className={styles.input} type="text" ref={(c) => { this.username = c; }} placeholder="Username" /><br />
        <input className={styles.input} type="password" ref={(c) => { this.password = c; }} placeholder="Password" />
        <p><Link to="/user/" className={styles.btn}>Login</Link></p><br />
      </div>
    );
  }
}
export default IndexPage;
