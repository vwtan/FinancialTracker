import React from 'react';
import { Link } from 'react-router';

import styles from './App.css';

export function IndexPage(props) {
  return (
    <div>
      <p><Link to="/user/" className={styles.btn}>Login</Link></p><br />
    </div>
  );
}
export default IndexPage;
