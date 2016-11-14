import React, { PropTypes } from 'react';

import styles from '../User.css';

function Sidebar(props) {
  return (
    <div className={styles.sidebar}>
      <p>Object 1</p>
      <p>Object 2</p>
    </div>
  );
}

export default Sidebar;
