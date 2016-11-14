import React from 'react';
import { Link } from 'react-router';

import styles from '../../styles/Dashboard.css';


export function DashboardCard(props) {
  return (
    <div className={styles[props.style]}>
      {props.children}
    </div>
  );
}

DashboardCard.propTypes = {
  children: React.PropTypes.string,
  style: React.PropTypes.string,
};

export default DashboardCard;
