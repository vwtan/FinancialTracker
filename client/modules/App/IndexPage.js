import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import callApi from '../../util/apiCaller';
import styles from './App.scss';
import { loginUser } from '../User/UserActions';

class IndexPage extends Component {
  handleClick() {
    const username = this.username;
    const password = this.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    this.props.dispatch(loginUser(creds));
  }
  handleClick2() {
    const username = this.username;
    const password = this.password;
    const creds = { username: username.value.trim(), password: password.value.trim() };
    callApi('register', 'post', { info: creds });
  }
  render() {
    return (
      <div className={styles.appPage}>
        <input className={styles.input} type="text" ref={(c) => { this.username = c; }} placeholder="Username" /><br />
        <input className={styles.input} type="password" ref={(c) => { this.password = c; }} placeholder="Password" />
        <p>
          <button className={styles.btn} onClick={() => { this.handleClick(); }}>Login</button>
          <button className={styles.btn} onClick={() => { this.handleClick2(); }}>Register</button>
        </p><br />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
}

export default connect(mapStateToProps)(IndexPage);
