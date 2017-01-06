import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import styles from '../styles/User.scss';

class Sidebar extends Component {
  render() {
    return (
      <div className={styles.sidebar}>
        <p><Link to="/user/">Dashboard</Link></p>
        <p>Other links</p>
        <p>Other links</p>
        <p>Other links</p>
        <p><Link to="/">Logout</Link></p>
      </div>
    );
  }
}

export default Sidebar;
