import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from '../User.scss';

function Sidebar(props) {
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

export default Sidebar;
