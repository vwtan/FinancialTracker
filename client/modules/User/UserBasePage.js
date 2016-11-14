import React from 'react';
import { Link } from 'react-router';

import styles from './User.css';
import Sidebar from './components/Sidebar';

/* eslint react/prop-types: 0 */
export function UserBasePage(props) {
  return (
    <div className={styles.bg}>
      <Sidebar />
      { props.children }
    </div>
  );
}
export default UserBasePage;
